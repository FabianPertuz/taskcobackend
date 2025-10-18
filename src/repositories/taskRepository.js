const { ObjectId } = require('mongodb');
const Task = require('../models/Task');
const database = require('../config/database');

class TaskRepository {
    constructor() {
        this.collection = null;
    }

    async init() {
        if (!this.collection) {
            this.collection = database.getCollection('tasks');
        }
    }

    async findAll(filters = {}) {
        await this.init();
        try {
            const cursor = this.collection.find(filters).sort({ fechaCreacion: -1 });
            return await cursor.toArray();
        } catch (error) {
            throw new Error(`Error al buscar tareas: ${error.message}`);
        }
    }

    async findById(id) {
        await this.init();
        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }
            return await this.collection.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw new Error(`Error al buscar tarea: ${error.message}`);
        }
    }

    async create(taskData) {
        await this.init();
        try {
            const task = new Task(taskData);
            const errors = task.validate();
            
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            const result = await this.collection.insertOne(task.toJSON());
            return { _id: result.insertedId, ...task.toJSON() };
        } catch (error) {
            throw new Error(`Error al crear tarea: ${error.message}`);
        }
    }

    async update(id, taskData) {
        await this.init();
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de tarea no válido');
            }

            const existingTask = await this.findById(id);
            if (!existingTask) {
                throw new Error('Tarea no encontrada');
            }

            const updatedData = { ...existingTask, ...taskData };
            const task = new Task(updatedData);
            const errors = task.validate();
            
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: task.toJSON() }
            );

            if (result.matchedCount === 0) {
                throw new Error('Tarea no encontrada');
            }

            return await this.findById(id);
        } catch (error) {
            throw new Error(`Error al actualizar tarea: ${error.message}`);
        }
    }

    async delete(id) {
        await this.init();
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de tarea no válido');
            }

            const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
            
            if (result.deletedCount === 0) {
                throw new Error('Tarea no encontrada');
            }

            return true;
        } catch (error) {
            throw new Error(`Error al eliminar tarea: ${error.message}`);
        }
    }

    async updateStatus(id, newStatus) {
        await this.init();
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de tarea no válido');
            }

            if (!['pendiente', 'en progreso', 'completada'].includes(newStatus)) {
                throw new Error('Estado no válido');
            }

            const result = await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { estado: newStatus } }
            );

            if (result.matchedCount === 0) {
                throw new Error('Tarea no encontrada');
            }

            return await this.findById(id);
        } catch (error) {
            throw new Error(`Error al actualizar estado: ${error.message}`);
        }
    }

    async findByStatus(estado) {
        await this.init();
        try {
            return await this.findAll({ estado });
        } catch (error) {
            throw new Error(`Error al buscar tareas por estado: ${error.message}`);
        }
    }
}

module.exports = new TaskRepository();
