class Task {
    constructor({ 
        titulo, 
        descripcion, 
        fechaLimite, 
        responsable, 
        estado = 'pendiente',
        fechaCreacion = new Date()
    }) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaLimite = new Date(fechaLimite);
        this.responsable = responsable;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
    }

    validate() {
        const errors = [];

        if (!this.titulo || this.titulo.trim().length === 0) {
            errors.push('El título es obligatorio');
        }

        if (this.titulo && this.titulo.length > 100) {
            errors.push('El título no puede exceder 100 caracteres');
        }

        if (this.descripcion && this.descripcion.length > 500) {
            errors.push('La descripción no puede exceder 500 caracteres');
        }

        if (!this.fechaLimite || isNaN(this.fechaLimite.getTime())) {
            errors.push('La fecha límite es obligatoria y debe ser válida');
        }

        if (this.fechaLimite && this.fechaLimite <= new Date()) {
            errors.push('La fecha límite debe ser futura');
        }

        if (!this.responsable || this.responsable.trim().length === 0) {
            errors.push('El responsable es obligatorio');
        }

        if (!['pendiente', 'en progreso', 'completada'].includes(this.estado)) {
            errors.push('Estado no válido');
        }

        return errors;
    }

    toJSON() {
        return {
            titulo: this.titulo,
            descripcion: this.descripcion,
            fechaLimite: this.fechaLimite,
            responsable: this.responsable,
            estado: this.estado,
            fechaCreacion: this.fechaCreacion
        };
    }
}

module.exports = Task;