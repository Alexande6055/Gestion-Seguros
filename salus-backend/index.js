const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json({ limit: '15mb' }));


app.use(cors()); // Permite todos los orígenes sin restricciones


// ✅ Carga de rutas principales
const usuarioRutas = require('./routes/usuario/usuario.rutas');
const loginRutas = require('./routes/login/login.rutas');
const seguroRutas = require('./routes/seguro/seguro.rutas');
const coberturaRouter = require('./routes/cobertura/cobertura.rutas');
const beneficioRouter = require('./routes/beneficio/beneficio.rutas');
const requisitoRouter = require('./routes/requisito/requisito.rutas');
const contratoRouter = require('./routes/contrato/contrato.rutas');
const reembolsoRoutes = require("./routes/reembolso/reembolso.rutas");
const solicitudesRoutes = require("./routes/Solicitudes/solicitudes.ruta");
const documentosSeguro = require("./routes/documento_contrato/documento.rutas");
const firmaElectronica = require("./routes/FirmaElectronica/firma.rutas");

// ✅ Registrar rutas ANTES de app.listen()
app.use('/usuario', usuarioRutas);
app.use('/login', loginRutas);
app.use('/seguros', seguroRutas);
app.use('/cobertura', coberturaRouter);
app.use('/beneficio', beneficioRouter);
app.use('/requisito', requisitoRouter);
app.use('/contratos', contratoRouter);
app.use('/solicitudes', solicitudesRoutes);
app.use('/reembolsos', reembolsoRoutes);
app.use('/documentos', documentosSeguro);
app.use('/firma', firmaElectronica);
app.use('/uploads', express.static("uploads")); // para servir los archivos

// Ruta base
app.get("/", (req, res) => {
    res.send("API en línea");
});

// ✅ Iniciar servidor (siempre al final)
app.listen(PORT, () => {
    console.log(`Servidor Express en http://localhost:${PORT}`);
});
