const taskRepository = require('../repositories/taskRepository');

exports.getAllTasks = async (req, res) => {
    try {
        const { estado } = req.query;
        let tasks;

        if (estado) {
            tasks = await taskRepository.findByStatus(estado);
        } else {
            tasks = await taskRepository.findAll();
        }

        res.json({
            success: true,
            data: tasks,
            count: tasks.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await taskRepository.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Tarea no encontrada'
            });
        }

        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = await taskRepository.create(req.body);
        
        res.status(201).json({
            success: true,
            data: task,
            message: 'Tarea creada correctamente'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await taskRepository.update(req.params.id, req.body);
        
        res.json({
            success: true,
            data: task,
            message: 'Tarea actualizada correctamente'
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await taskRepository.delete(req.params.id);
        
        res.json({
            success: true,
            message: 'Tarea eliminada correctamente'
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({
                success: false,
                error: 'El estado es requerido'
            });
        }

        const task = await taskRepository.updateStatus(req.params.id, estado);
        
        res.json({
            success: true,
            data: task,
            message: 'Estado actualizado correctamente'
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            error: error.message
        });
    }
};