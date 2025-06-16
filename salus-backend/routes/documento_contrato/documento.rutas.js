const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const bcrypt = require('bcrypt');

const multer = require('multer');
const nodemailer = require('nodemailer');

// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/', async (req, res) => {
    const { idContrato, documento, tipoDocumento } = req.body;

    if (!idContrato || !documento || !tipoDocumento) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const query = `
        INSERT INTO sistema.documento_contrato (
            id_contrato,
            documento,
            tipo_documento
        ) VALUES ( ?, ?, ?);
    `;

    db.query(query, [idContrato, documento, tipoDocumento], (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.status(500).json({ error: 'Error al insertar el documento.' });
        }
        if (tipoDocumento === 'contrato') {
            const query2 = `
            UPDATE sistema.usuario_seguro
            SET estado=1 WHERE id_usuario_seguro=?
        `;
            db.query(query2, [idContrato], (error, results) => {
                if (error) {
                    console.error('Error en la consulta SQL:', error);
                    return;
                }
            });
        }
        return res.status(200).json({ mensaje: 'Documento insertado correctamente', results });
    });
});

router.post("/enviar-pdf", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        const { id, nombre, email } = req.body;
        if (!id || !nombre || !email) {
            return res.status(400).json({ error: "Faltan id o nombre en el body." });
        }
        // Generar password
        const randomNum = Math.floor(Math.random() * 100) + 1;
        const passwordPlain = `${id}${nombre}${randomNum}`;

        // Hashear el password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(passwordPlain, salt);

        // Crear objeto JSON
        const claveObj = { clave: passwordHash };
        const claveBuffer = Buffer.from(JSON.stringify(claveObj, null, 2));

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "gestioinplus@gmail.com",
                pass: "yglb ikhe xrhk vvmp",
            },
        });

        const info = await transporter.sendMail({
            from: 'Salud Para Ti <gestioinplus@gmail.com>',
            to: email,
            subject: "Contrato De Seguro",
            text: `
            Estimado usuario:

            El archivo JSON adjunto contiene su clave personal de firma electrónica. Le recordamos que el uso indebido, divulgación o manipulación no autorizada de esta clave puede conllevar a la suspensión temporal o permanente de su cuenta en la plataforma. Esta suspensión no implica la finalización de sus seguros vigentes, pero no podrá adquirir nuevas pólizas una vez finalice la cobertura actual.

            La clave de firma electrónica es personal e intransferible. Su protección es fundamental para garantizar la seguridad de sus transacciones y la validez de sus contratos.

            Ante cualquier duda o sospecha de uso no autorizado, por favor comuníquese de inmediato con nuestro equipo de soporte.

            Atentamente,
            Equipo de Salud Para Ti
            `, html: `<p>Estimado usuario:</p>
            <p>
            El archivo <b>JSON</b> adjunto contiene su clave personal de <b>firma electrónica</b>. Le recordamos que el uso indebido, divulgación o manipulación no autorizada de esta clave puede conllevar a la <b>suspensión temporal o permanente</b> de su cuenta en la plataforma. Esta suspensión <b>no implica la finalización de sus seguros vigentes</b>, pero no podrá adquirir nuevas pólizas una vez finalice la cobertura actual.
            </p>
            <p>
            La clave de firma electrónica es <b>personal e intransferible</b>. Su protección es fundamental para garantizar la seguridad de sus transacciones y la validez de sus contratos.
            </p>
            <p>
            Ante cualquier duda o sospecha de uso no autorizado, por favor comuníquese de inmediato con nuestro equipo de soporte.
            </p>
            <p>
            Atentamente,<br>
            <b>Equipo de Salud Para Ti</b>
            </p>
            `,
            attachments: [
                {
                    filename: "contrato.pdf",
                    content: file.buffer,
                },
                {
                    filename: "clave.json",
                    content: claveBuffer,
                },
            ],
        });
        const query = `
        INSERT INTO sistema.firma_electronica (
            id_usuario,
            clave,
            estado
        ) VALUES ( ?, ?, ?);
    `;

        db.query(query, [id, passwordHash, "ACTIVADA"], (error, results) => {
            if (error) {
                console.error('Error en la consulta SQL:', error);
                return res.status(500).json({ error: 'Error al insertar LA CLAVE.' });
            }
        });

        res.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ error: "No se pudo enviar el correo." });
    }
});

module.exports = router;
