# 🚀 Task Management Backend - MongoDB Driver

Sistema de gestión de tareas colaborativas con Node.js, Express y MongoDB Driver nativo.

## 🛠️ Tecnologías

- Node.js
- Express.js
- MongoDB Native Driver
- Express Validator
- CORS
- Dotenv

## 📋 Características

- ✅ CRUD completo de tareas
- ✅ Validaciones con express-validator
- ✅ Validaciones personalizadas en el modelo
- ✅ Manejo de errores robusto
- ✅ Transacciones MongoDB
- ✅ API RESTful
- ✅ CORS configurado

## 🔧 Instalación

1. Clonar el repositorio
2. `npm install`
3. Configurar `.env`
4. `npm run dev`

## 📡 Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas |
| GET | `/api/tasks?estado=pendiente` | Filtrar por estado |
| POST | `/api/tasks` | Crear tarea |
| PUT | `/api/tasks/:id` | Actualizar tarea |
| PATCH | `/api/tasks/:id/status` | Cambiar estado |
| DELETE | `/api/tasks/:id` | Eliminar tarea |

## 🎯 Frontend

Repositorio del frontend: []