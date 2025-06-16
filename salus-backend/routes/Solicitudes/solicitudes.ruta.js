const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Crear una solicitud de asesoria
router.post('/', (req, res) => {
    const { nombre, apellido, cedula, telefono, email, mensaje } = req.body;
    if (!nombre || !apellido || !cedula || !telefono || !email || !mensaje) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const sql = `
  INSERT INTO solicitudes_asesoria (nombre, apellido, cedula, telefono, email, mensaje, estado)
  VALUES (?, ?, ?, ?, ?, ?, "Pendiente")
`;

    db.query(sql, [nombre, apellido, cedula, telefono, email, mensaje], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send('Error al crear seguro');
        }
        res.status(201).json({ id: result.insertId });
    });
});

router.get('/', (req, res) => {
    const sql = `
  SELECT * FROM solicitudes_asesoria;
`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al consultar solicitudes' });
        res.json(results);
    });
})

module.exports = router;
