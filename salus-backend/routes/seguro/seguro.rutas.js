const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Obtener todos los seguros activos con beneficios y requisitos
router.get('/', async (req, res) => {
  try {
    db.query('SELECT * FROM seguro WHERE estado = 1', async (err, results) => {
      if (err) return res.status(500).send('Error al obtener seguros');

      const segurosConExtras = await Promise.all(results.map(async (seguro) => {
        const beneficios = await new Promise((resolve) => {
          db.query(
            `SELECT b.nombre FROM beneficio b
            JOIN seguro_beneficio sb ON sb.id_beneficio_per = b.id_beneficio
            WHERE sb.id_seguro_per = ?`,
            [seguro.id_seguro],
            (err, resB) => resolve(resB || [])
          );
        });

        const requisitos = await new Promise((resolve) => {
          db.query(
            `SELECT r.nombre FROM requisito r
            JOIN seguro_requisito sr ON sr.id_requisito_per = r.id_requisito
            WHERE sr.id_seguro_per = ?`,
            [seguro.id_seguro],
            (err, resR) => resolve(resR || [])
          );
        });

        return {
          ...seguro,
          beneficios,
          requisitos
        };
      }));

      res.json(segurosConExtras);
    });
  } catch (error) {
    res.status(500).send('Error interno al procesar seguros');
  }
});

// Crear un nuevo seguro
router.post('/', (req, res) => {
  const { nombre, precio, tiempo_pago, descripcion, tipo, cobertura, num_beneficiarios } = req.body;
  if (!nombre || !precio || !tiempo_pago || !tipo || !cobertura || !num_beneficiarios) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const sql = `
  INSERT INTO seguro (nombre, precio, tiempo_pago, tipo, cobertura, descripcion, num_beneficiarios, estado)
  VALUES (?, ?, ?, ?, ?, ?, ?, 1)
`;

  db.query(sql, [nombre, precio, tiempo_pago, tipo, cobertura, descripcion, num_beneficiarios], (err, result) => {

    if (err) return res.status(500).send('Error al crear seguro');
    res.status(201).json({ id: result.insertId });
  });
});

// Editar un seguro
router.put('/:id', (req, res) => {
  const {
    nombre,
    precio,
    tiempo_pago,
    tipo,
    cobertura,
    descripcion,
    num_beneficiarios
  } = req.body;

  const { id } = req.params;

  const sql = `
    UPDATE seguro
    SET nombre=?, precio=?, tiempo_pago=?, tipo=?, cobertura=?, descripcion=?, num_beneficiarios=?
    WHERE id_seguro=?`;

  db.query(sql, [
    nombre, precio, tiempo_pago, tipo,
    cobertura, descripcion, num_beneficiarios, id
  ], (err) => {
    if (err) {
      return res.status(500).send('Error al editar seguro');
    }
    res.sendStatus(200);
  });
});


// Desactivar un seguro
router.put('/desactivar/:id', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE seguro SET estado = 0 WHERE id_seguro = ?', [id], (err) => {
    if (err) return res.status(500).send('Error al desactivar seguro');
    res.sendStatus(200);
  });
});

// Activar un seguro
router.put('/activar/:id', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE seguro SET estado = 1 WHERE id_seguro = ?', [id], (err) => {
    if (err) return res.status(500).send('Error al activar seguro');
    res.sendStatus(200);
  });
});

// Obtener seguros inactivos
router.get('/inactivos', (req, res) => {
  db.query('SELECT * FROM seguro WHERE estado = 0', (err, results) => {
    if (err) return res.status(500).send('Error al obtener seguros inactivos');
    res.json(results);
  });
});

// Asociar beneficios al seguro
router.post('/beneficios', (req, res) => {
  const { id_seguro, ids } = req.body;

  if (!id_seguro || !Array.isArray(ids)) {
    return res.status(400).send('Datos inválidos');
  }

  const valores = ids.map(id => [id_seguro, id]);
  db.query('DELETE FROM seguro_beneficio WHERE id_seguro_per = ?', [id_seguro], () => {
    if (valores.length === 0) return res.sendStatus(200);
    db.query('INSERT INTO seguro_beneficio (id_seguro_per, id_beneficio_per) VALUES ?', [valores], (err) => {
      if (err) return res.status(500).send('Error al asociar beneficios');
      res.sendStatus(200);
    });
  });
});

// Asociar requisitos al seguro
router.post('/requisitos', (req, res) => {
  const { id_seguro, ids } = req.body;

  if (!id_seguro || !Array.isArray(ids)) {
    return res.status(400).send('Datos inválidos');
  }

  const valores = ids.map(id => [id_seguro, id]);
  db.query('DELETE FROM seguro_requisito WHERE id_seguro_per = ?', [id_seguro], () => {
    if (valores.length === 0) return res.sendStatus(200);
    db.query('INSERT INTO seguro_requisito (id_seguro_per, id_requisito_per) VALUES ?', [valores], (err) => {
      if (err) return res.status(500).send('Error al asociar requisitos');
      res.sendStatus(200);
    });
  });
});

// (Opcional) Asociar coberturas si las manejas en tabla
router.post('/coberturas', (req, res) => {
  const { id_seguro, ids } = req.body;
  if (!id_seguro || !Array.isArray(ids)) return res.status(400).send('Datos inválidos');

  const valores = ids.map(id => [id_seguro, id]);
  db.query('DELETE FROM seguro_cobertura WHERE id_seguro_per = ?', [id_seguro], () => {
    if (valores.length === 0) return res.sendStatus(200);
    db.query('INSERT INTO seguro_cobertura (id_seguro_per, id_cobertura_per) VALUES ?', [valores], (err) => {
      if (err) return res.status(500).send('Error al asociar coberturas');
      res.sendStatus(200);
    });
  });
});

//optener seguros del usuario
router.get('/usuario/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    select
      us.id_usuario_seguro as id_seguro,
      s.nombre,
      s.descripcion,
      us.estado,
      s.cobertura,
      us.fecha_contrato
    from
      seguro s
    inner join usuario_seguro us on
      s.id_seguro = us.id_seguro_per
    inner join usuario u on
      u.id_usuario = us.id_usuario_per
    where
      u.id_usuario =?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los seguros');
    }
    res.json(results);
  });
});

//optener seguros del usuario
router.get('/pago/usuario/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    select
      ps.id_pago_seguro as id,
      us.id_seguro_per as id_seguro,
      ps.fecha_pago,
      ps.cantidad,
      ps.comprobante_pago
    from
      pago_seguro ps
    inner join usuario_seguro us on
      us.id_usuario_seguro = ps.id_usuario_seguro_per
    inner join usuario u on
      u.id_usuario = us.id_usuario_per
    where
      u.id_usuario =?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los seguros');
    }
    res.json(results);
  });
});

// Subir seguros del usuario
router.post('/pago/usuario/:id', (req, res) => {
  const { id } = req.params;
  const { comprobante_pago } = req.body;
  const { fecha_pago } = req.body;
  const { cantidad } = req.body;
  if (!comprobante_pago) {
    return res.status(400).json({ error: 'Falta comprobante_pago' });
  }

  const sql = `
    INSERT INTO pago_seguro (id_usuario_seguro_per, fecha_pago, cantidad, comprobante_pago)
    VALUES (?, ?, ?, ?);`;

  db.query(sql, [id, fecha_pago, cantidad, comprobante_pago], (err, results) => {
    if (err) {
      console.error('Error al insertar pago:', err);
      return res.status(500).send('Error al insertar pago');
    }
    res.json({ message: 'Pago registrado correctamente', data: results });
  });
});


//obtener los tipos de seguro en la base de datos
router.get('/obtenerSeguros', (req, res) => {
  const sql = `
      SELECT id_seguro,nombre FROM seguro;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener seguros')
    }
    res.json(results);
  });

});

module.exports = router;
