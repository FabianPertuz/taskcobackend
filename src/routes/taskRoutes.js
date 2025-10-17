const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTask, validateObjectId } = require('../middleware/validation');

// GET /api/tasks - Obtener todas las tareas (con filtro opcional por estado)
router.get('/tasks', taskController.getAllTasks);

// GET /api/tasks/:id - Obtener tarea por ID
router.get('/tasks/:id', validateObjectId, taskController.getTaskById);

// POST /api/tasks - Crear nueva tarea
router.post('/tasks', validateTask, taskController.createTask);

// PUT /api/tasks/:id - Actualizar tarea completa
router.put('/tasks/:id', validateObjectId, validateTask, taskController.updateTask);

// PATCH /api/tasks/:id/status - Actualizar solo el estado
router.patch('/tasks/:id/status', validateObjectId, taskController.updateTaskStatus);

// DELETE /api/tasks/:id - Eliminar tarea
router.delete('/tasks/:id', validateObjectId, taskController.deleteTask);

module.exports = router;