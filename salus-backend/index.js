const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json());

const allowedOrigins = [
    'http://localhost:3000',
    'http://172.25.48.1:8080',
    'http://localhost:8080'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
}));

// ✅ Carga de rutas principales
const usuarioRutas = require('./routes/usuario/usuario.rutas');
const loginRutas = require('./routes/login/login.rutas');
const seguroRutas = require('./routes/seguro/seguro.rutas');
const coberturaRouter = require('./routes/cobertura/cobertura.rutas');
const beneficioRouter = require('./routes/beneficio/beneficio.rutas');
const requisitoRouter = require('./routes/requisito/requisito.rutas');
const contratoRouter = require('./routes/contrato/contrato.rutas');
const reembolsoRoutes = require("./routes/reembolso/reembolso.rutas");

// ✅ Registrar rutas ANTES de app.listen()
app.use('/usuario', usuarioRutas);
app.use('/login', loginRutas);
app.use('/seguros', seguroRutas);
app.use('/cobertura', coberturaRouter);
app.use('/beneficio', beneficioRouter);
app.use('/requisito', requisitoRouter);
app.use('/contratos', contratoRouter);
app.use('/api/reembolsos', reembolsoRoutes);
app.use('/uploads', express.static("uploads")); // para servir los archivos

// Ruta base
app.get("/", (req, res) => {
    res.send("API en línea");
});

// ✅ Iniciar servidor (siempre al final)
app.listen(PORT, () => {
    console.log(`Servidor Express en http://localhost:${PORT}`);
});
