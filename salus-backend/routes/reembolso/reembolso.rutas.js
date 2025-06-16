const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ⚠️ Ya existente: Ruta para subir archivos
// ... (NO DUPLICAR)

// ✅ NUEVA RUTA: Obtener reembolsos por id_usuario
router.get("/:id_usuario", (req, res) => {
  const idUsuario = req.params.id_usuario;

  const sql = `
    SELECT
      r.id_reembolso,
      r.fecha_gasto,
      r.tipo_gasto,
      r.monto,
      r.descripcion,
      r.estado,
      ra.nombre_archivo
    FROM reembolso r
    INNER JOIN usuario_seguro us ON r.id_usuario_seguro_per = us.id_usuario_seguro
    INNER JOIN usuario u ON us.id_usuario_per = u.id_usuario
    LEFT JOIN reembolso_archivo ra ON r.id_reembolso = ra.id_reembolso
    WHERE u.id_usuario = ?
    ORDER BY r.id_reembolso DESC
  `;

  db.query(sql, [idUsuario], (err, results) => {
    if (err) {
      console.error("Error al consultar reembolsos:", err);
      return res.status(500).json({ error: "Error al consultar reembolsos" });
    }

    // Agrupar por reembolso
    const agrupados = {};
    results.forEach((row) => {
      if (!agrupados[row.id_reembolso]) {
        agrupados[row.id_reembolso] = {
          id: row.id_reembolso,
          fecha: row.fecha_gasto,
          tipo: row.tipo_gasto,
          monto: row.monto,
          descripcion: row.descripcion,
          estado: row.estado,
          archivos: [],
        };
      }
      if (row.nombre_archivo) {
        agrupados[row.id_reembolso].archivos.push(
          `http://localhost:8000/uploads/reembolsos/${row.nombre_archivo}`
        );
      }
    });

    res.json(Object.values(agrupados));
  });
});


router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { fecha_gasto, tipo_gasto, monto, comprobante, descripcion } = req.body;
  if (!fecha_gasto || !tipo_gasto || !monto || !comprobante || !descripcion) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const sql = `
  INSERT INTO reembolso (fecha_gasto, tipo_gasto, monto_solicitado, comprobante, descripcion,id_usuario)
  VALUES (?, ?, ?, ?, ?, ?)
`;

  db.query(sql, [fecha_gasto, tipo_gasto, monto, comprobante, descripcion, id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send('Error al crear reembolso');
    }
    res.status(201).json({ id: result.insertId });
  });
})

module.exports = router;
