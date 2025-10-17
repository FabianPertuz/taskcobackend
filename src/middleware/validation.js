const { body, validationResult } = require('express-validator');

const validateTask = [
    body('titulo')
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ max: 100 }).withMessage('Máximo 100 caracteres')
        .trim(),
    body('descripcion')
        .optional()
        .isLength({ max: 500 }).withMessage('Máximo 500 caracteres')
        .trim(),
    body('fechaLimite')
        .isISO8601().withMessage('Fecha debe tener formato válido (YYYY-MM-DD)')
        .custom((value) => {
            if (new Date(value) <= new Date()) {
                throw new Error('La fecha límite debe ser futura');
            }
            return true;
        }),
    body('responsable')
        .notEmpty().withMessage('El responsable es obligatorio')
        .trim(),
    body('estado')
        .optional()
        .isIn(['pendiente', 'en progreso', 'completada']).withMessage('Estado no válido'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Error de validación',
                details: errors.array() 
            });
        }
        next();
    }
];

const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    
    if (!objectIdRegex.test(id)) {
        return res.status(400).json({ 
            error: 'ID no válido' 
        });
    }
    next();
};

module.exports = {
    validateTask,
    validateObjectId
};