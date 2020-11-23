const { Estudiante } = require('../models');
const { Sede } = require('../models');
const { Estado } = require('../models');
const { NivelIngles } = require('../models');
const EstudianteDTO = require('../models/DTOs/estudianteDTO');
const Sequelize = require('sequelize');
const { nivelIngles } = require('../../resources/nombresRutas');
const EstudianteMapper = require('../models/mappers/estudianteMapper');
const { Nodo } = require('../models');

const EstudianteService = {

    encontrarEstudiantes: async(parameters) => {
        const Op = Sequelize.Op;
        if('nombre' in parameters)
            parameters.nombre = { [Op.startsWith]: parameters.nombre };
        if('apellido' in parameters)
            parameters.apellido = { [Op.startsWith]: parameters.apellido };
        let todosLosEstudiantes = await Estudiante.findAll({
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }],
            where: parameters,
        });
        todosLosEstudiantes = todosLosEstudiantes.map(x => x.dataValues);
        return { 'response': todosLosEstudiantes };
    },

    encontrarEstudiantesDTO: async(parameters) => {
        const Op = Sequelize.Op;
        if('nombre' in parameters)
            parameters.nombre = { [Op.startsWith]: parameters.nombre };
        if('apellido' in parameters)
            parameters.apellido = { [Op.startsWith]: parameters.apellido };
        let todosLosEstudiantes = await Estudiante.findAll({
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }],
            where: parameters,
        });
        todosLosEstudiantes = EstudianteMapper.obtenerDtoDeListaEstudiantes(todosLosEstudiantes);
        return { 'response': todosLosEstudiantes };
    },

    encontrarEgresadePorId: async(estudianteId) => {
        let egresade = await Estudiante.findByPk(estudianteId, {
            where: {
                estadoId: 3
            },
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }]
        })
        return { 'response': egresade };
    },

    encontrarEgresadePorIdDTO: async(estudianteId) => {
        let egresade = await Estudiante.findByPk(estudianteId, {
            where: {
                estadoId: 3
            },
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }]
        })
        let estudianteDTO = new EstudianteDTO(egresade);
        return { 'response': estudianteDTO.obtenerDtoDeEstudiante() };
    },

    encontrarEstudiantePorId: async(estudianteId) => {
        let egresade = await Estudiante.findByPk(estudianteId, {
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }]
        })
        return { 'response': egresade };
    },

    encontrarEstudianteDTOPorId: async(estudianteId) => {
        let egresade = await Estudiante.findByPk(estudianteId, {
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }]
        })
        let estudianteDTO = new EstudianteDTO(egresade);
        return { 'response': estudianteDTO.obtenerDtoDeEstudiante() };
    },
  
    registrarEstudiantesEgresades: async(request, response) => {
        var estudiantes = request.body

        estudiantes.forEach(async estudiante => {
            await Estudiante.count({ where: { nombre: estudiante.nombre, apellido: estudiante.apellido } }).then(async count => {
                if (count != 0) {
                    await Estudiante.update(estudiante, {
                        where: {
                            nombre: estudiante.nombre,
                            apellido: estudiante.apellido,
                            estadoId: 3
                        }
                    })
                } else {
                    await Estudiante.create(estudiante, {
                        where: {
                            estadoId: 3
                        }
                    })
                }
            })
        })
        return 200
    },

    importarListaEgresadesDTO: async(request, response) => {
        const estudiantesDTO = request.body;
        const estudiantes = await Promise.all(estudiantesDTO.map(async estudianteDTO => {
            estudianteDTO.estadoId = 3;
            return await EstudianteMapper.obtenerEstudianteDeDTO(estudianteDTO);
        })); 
        await Estudiante.bulkCreate(estudiantes, { validate: true });
        return 200;
    },

    actualizarEstudiante: async(request, response) => {
        try {
            const resultado = await Estudiante.update(request.body, { where: { id: request.params.id } });
            let estudiante = await Estudiante.findByPk(request.params.id);
            return { message: "El estudiante fue actualizado exitosamente", Estudiante: estudiante };
        } catch (error) {
            throw error;
        }
    },

    crearEstudiante: async(request, response) => {
        try {
            const estudiante = request.body;
            let resultado = '';
            await Estudiante.count({ where: { nombre: estudiante.nombre, apellido: estudiante.apellido } }).then(async count => {
                if (count != 0) {
                    resultado = await Estudiante.update(estudiante, {
                        where: {
                            nombre: estudiante.nombre,
                            apellido: estudiante.apellido,
                        }
                    })
                } else {
                    resultado = await Estudiante.create(estudiante);
                }
            })
            return { message: "El estudiante fue creado exitosamente", result: resultado };
        } catch (error) {
            throw error;
        }
    },
    
    eliminarEstudiante: async(request, response) => {
        try {
            const resultado = await Estudiante.destroy({ where: { id: request.params.id } });
            return { message: "El Estudiante  fue eliminado exitosamente", result: resultado };
        } catch (error) {
            throw error;
        }
    },
 
    encontrarEstudiantesEgresades: async(parameters) => {
        const Op = Sequelize.Op;
        const pagina = parameters.pagina-1;
        delete parameters.pagina;
        const criterioDeOrden = parameters.ordenarPor || 'id';
        delete parameters.ordenarPor;
        const sentidoDeOrden = criterioDeOrden ==='añoGraduacion' ? 'DESC':'ASC';
        if('nombre' in parameters)
            parameters.nombre = { [Op.startsWith]: parameters.nombre };
        if('apellido' in parameters)
            parameters.apellido = { [Op.startsWith]: parameters.apellido };
        let todosLosEgresadesPorNombre = await Estudiante.findAll({
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }],
            offset: pagina * 10,
            limit: 10,
            where: parameters,
            order: [
                [criterioDeOrden, sentidoDeOrden]
              ]
        });
        return { 'response': todosLosEgresadesPorNombre };
    },

    encontrarEstudiantesEgresadesDTO: async(parameters) => {
        const Op = Sequelize.Op;
        const pagina = parameters.pagina-1;
        delete parameters.pagina;
        const criterioDeOrden = parameters.ordenarPor || 'id';
        delete parameters.ordenarPor;
        const sentidoDeOrden = criterioDeOrden ==='añoGraduacion' ? 'DESC':'ASC';
        if('nombre' in parameters)
            parameters.nombre = { [Op.startsWith]: parameters.nombre };
        if('apellido' in parameters)
            parameters.apellido = { [Op.startsWith]: parameters.apellido };
        let todosLosEstudiantes = await Estudiante.findAll({
            where: {
                estadoId: 3
            },
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }],
            offset: pagina * 10,
            limit: 10,
            where: parameters,
            order: [
                [criterioDeOrden, sentidoDeOrden]
              ]
        });
        todosLosEstudiantes = EstudianteMapper.obtenerDtoDeListaEstudiantes(todosLosEstudiantes);
        return { 'response': todosLosEstudiantes };
    },

    encontrarEgresadesSinPaginacion: async (parameters) => {
        const Op = Sequelize.Op;
        if('nombre' in parameters)
            parameters.nombre = { [Op.startsWith]: parameters.nombre };
        if('apellido' in parameters)
            parameters.apellido = { [Op.startsWith]: parameters.apellido };
        let todosLosEgresadesPorNombre = await Estudiante.findAll({
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }],
            where: parameters,
        });
        return { 'response': todosLosEgresadesPorNombre };
    },

    encontrarEgresadesSinPaginacionDTO: async(parameters) => {
        const Op = Sequelize.Op;
        if('nombre' in parameters)
            parameters.nombre = { [Op.startsWith]: parameters.nombre };
        if('apellido' in parameters)
            parameters.apellido = { [Op.startsWith]: parameters.apellido };
        let todosLosEstudiantes = await Estudiante.findAll({
            where: {
                estadoId: 3
            },
            attributes: {exclude: ['sedeId','nodoId','nivelInglesId']},
            include: [
            {
                model: Sede,
                as: 'sede',
                attributes: {exclude: ['NodoId']}
            },
            {
                model: Nodo,
                as: 'nodo',
                include: {
                    model: Sede,
                    as: 'sedes',
                    attributes: {exclude: ['NodoId']}
                }
            },
            {
                model: Estado,
                as: 'estado',
            },
            {
                model: NivelIngles,
                as: 'nivelIngles',
            }],
            where: parameters,
        });
        todosLosEstudiantes = EstudianteMapper.obtenerDtoDeListaEstudiantes(todosLosEstudiantes);
        return { 'response': todosLosEstudiantes };
    },

    cambiarEstadoAlumnes: async(request, response) => {
        var estudiantes = request.body.estudiantes
        var estado=request.body.estado
        var resultado = []
        for(const estudiante of estudiantes ){
            let estudianteEncontrado = await Estudiante.findByPk(estudiante.id);
            if(estudianteEncontrado == null){
                resultado.push({ Operacion: "El estudiante con id " + estudiante.id + " no existe"});
                codigo = 400;
            }
            else{
                if(estudianteEncontrado.estadoId!=2){
                    resultado.push({ Operacion: "El estudiante " + estudianteEncontrado.nombreCompleto + " no es un alumne"});
                    codigo = 400;
                }
                else{
                    estudianteActualizado = {
                        "id":estudiante.id,
                        "estadoId":estado
                    }
                    await Estudiante.update(estudianteActualizado, { where: { id: estudianteEncontrado.id } });
                    resultado.push({ Operacion: "Se cambio el estado correctamente de estudiante: "+estudianteEncontrado.nombreCompleto});
                    codigo=200;
                }
            }    
        };  
        return {message: resultado, result: codigo}; 
    },
}

module.exports = EstudianteService;