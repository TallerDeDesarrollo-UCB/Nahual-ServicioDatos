'use strict';

const { Estudiante } = require('../');
const { Sede } = require("../");
const { NivelIngles } = require('../');

class EstudianteDTO {
    
    constructor(estudiante) {
        this.estudianteDTO = {
            'id': estudiante.id,
            'nombreCompleto': estudiante.nombreCompleto,
            'Estado': estudiante.estado.nombre,
            'fechaNacimiento': estudiante.fechaNacimiento,
            'correo': estudiante.correo,
            'celular': estudiante.celular,
            'sede': estudiante.sede.nombre,
            'nodo': estudiante.nodo.nombre,
            'añoGraduacion': estudiante.añoGraduacion,
            'cuatrimestre': estudiante.cuatrimestre,
            'nivelIngles': estudiante.nivelIngles.nombre,
            'nombrePrimerTrabajo': estudiante.nombrePrimerTrabajo,
            'linkedin': estudiante.linkedin,
            'esEmpleado': estudiante.esEmpleado,
            'modulo': estudiante.modulo
        }
    }

    obtenerDtoDeEstudiante() {
        return this.estudianteDTO;
    }

}

module.exports = EstudianteDTO;