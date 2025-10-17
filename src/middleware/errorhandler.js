const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);

    // Error de validación de express-validator
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            error: 'JSON malformado'
        });
    }

    // Error de MongoDB
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
        return res.status(500).json({
            success: false,
            error: 'Error de base de datos'
        });
    }

    // Error por defecto
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
    });
};

module.exports = errorHandler;