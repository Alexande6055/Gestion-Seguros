const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const util = require('util');
const multer = require('multer');
const { PDFDocument, rgb } = require('pdf-lib');
const QRCode = require('qrcode');

// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const query = util.promisify(db.query).bind(db);

router.post('/firmar-documento', upload.fields([{ name: 'pdf' }]), async (req, res) => {
    const pdfFile = req.files?.pdf?.[0];
    const claveFile = req.body.clave;
    const id_usuario = req.body.id_usuario;

    if (!id_usuario || !claveFile, !pdfFile) {
        return res.status(404).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar clave
        const result1 = await query(`
            SELECT fe.clave 
            FROM firma_electronica fe 
            WHERE fe.id_usuario = ? AND fe.estado = 'ACTIVADA'
        `, [id_usuario]);

        if (result1.length === 0 || result1[0].clave !== claveFile) {
            return res.status(401).json({
                mensaje: 'No estás permitido para firmar este documento. Ten en cuenta que si intentas varias veces tu cuenta será suspendida'
            });
        }

        // Obtener datos del usuario
        const result2 = await query(`
            SELECT u.nombre, u.apellido, u.cedula 
            FROM usuario u 
            WHERE u.id_usuario = ?
        `, [id_usuario]);

        const usuario = result2[0];


        const { nombre, apellido, cedula } = usuario;

        // Cargar PDF original
        const pdfDoc = await PDFDocument.load(pdfFile.buffer);

        // Crear nueva página
        const newPage = pdfDoc.addPage();
        const { width, height } = newPage.getSize();

        const qrData = `Firmado por: ${nombre} ${apellido}\nCédula: ${cedula}`;
        const qrDataUrl = await QRCode.toDataURL(qrData);
        const qrImageBytes = await fetch(qrDataUrl).then(res => res.arrayBuffer());
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        const qrWidth = 150;
        const qrHeight = 150;
        const centerX = (width - qrWidth) / 2;
        const centerY = height / 2;

        newPage.drawImage(qrImage, {
            x: centerX,
            y: centerY,
            width: qrWidth,
            height: qrHeight
        });

        newPage.drawText(`Firmado por: ${nombre} ${apellido}`, {
            x: centerX,
            y: centerY - 30,
            size: 14,
            color: rgb(0, 0, 0),
        });

        newPage.drawText(`Cédula: ${cedula}`, {
            x: centerX,
            y: centerY - 50,
            size: 14,
            color: rgb(0, 0, 0),
        });

        const signedPdfBytes = await pdfDoc.save();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="documento_firmado.pdf"',
        });

        return res.send(Buffer.from(signedPdfBytes));

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error de conexión a la base de datos.' });
    }


})

module.exports = router;
