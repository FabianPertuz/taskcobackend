require("dotenv").config();
const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorhandler");

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Conectar a la base de datos local
database.connect();

// ✅ Middlewares
app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5501",
    "http://127.0.0.1:5501"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Logging de requests (útil para depurar)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ✅ Rutas principales (corregido aquí 👇)
app.use("/api/tasks", taskRoutes);


// ✅ Ruta de prueba /health
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: "Connected",
  });
});

// ✅ Manejo de rutas inexistentes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
  });
});

// ✅ Middleware global de errores
app.use(errorHandler);

// ✅ Cierre controlado del servidor
process.on("SIGINT", async () => {
  console.log("\n🛑 Cerrando servidor...");
  await database.disconnect();
  process.exit(0);
});

// ✅ Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
