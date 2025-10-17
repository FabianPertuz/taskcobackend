require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorhandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
database.connect();

// Middlewares
app.use(cors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:5500'],
    credentials: true
}));
app.use(express.json());

// Logging de requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rutas
app.use('/api', taskRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'Connected'
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Ruta no encontrada' 
    });
});

// Manejo de errores global
app.use(errorHandler);

// Manejo de cierre graceful
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...');
    await database.disconnect();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 Health check disponible en http://localhost:${PORT}/health`);
});