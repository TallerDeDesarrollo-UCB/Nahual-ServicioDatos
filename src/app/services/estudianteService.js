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
        const pagina = parameters.pagina - 1;
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
            offset: pagina * 10,
            limit: 10
        });
        todosLosEstudiantes = todosLosEstudiantes.map(x => x.dataValues);
        return { 'response': todosLosEstudiantes };
    },

    encontrarEstudiantesDTO: async(parameters) => {
        const pagina = parameters.pagina - 1;
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
            offset: pagina * 10,
            limit: 10
        });
        todosLosEstudiantes = EstudianteMapper.obtenerDtoDeListaEstudiantes(todosLosEstudiantes);
        return { 'response': todosLosEstudiantes };
    },

    encontrarEgresadePorId: async(estudianteId) => {
        let egresade = await Estudiante.findByPk(estudianteId, {
            where: {
                estadoId: 4
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
                estadoId: 4
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
            await Estudiante.count({ where: { nombreCompleto: estudiante.nombreCompleto } }).then(async count => {
                if (count != 0) {
                    await Estudiante.update(estudiante, {
                        where: {
                            nombreCompleto: estudiante.nombreCompleto,
                            estadoId: 4
                        }
                    })
                } else {
                    await Estudiante.create(estudiante, {
                        where: {
                            estadoId: 4
                        }
                    })
                }
            })
        })
        return 200
    },

    registrarEstudiantesEgresadesDTO: async(request, response) => {
        var estudiantesDTO = request.body;
        estudiantesDTO.forEach(async estudianteDTO => {
            const dtoTieneNodo = 'nodo' in estudiantesDTO;
            const dtoTieneSede = 'sede' in estudiantesDTO;
            const estudiante = await EstudianteMapper.obtenerEstudianteDeDTO(estudianteDTO);
            if(!estudiante.nodoId && dtoTieneNodo) {
                const nodoCreado = await Nodo.create({
                    nombre: estudianteDTO.nodo,
                });
                const sedeCreada = await nodoCreado.createSede({
                    nombre: estudianteDTO.sede,
                });
                estudiante.nodoId = nodoCreado.id;
                estudiante.sedeId = sedeCreada.id;
            } else {
                if(!estudiante.sedeId && dtoTieneSede) {
                    const sedeCreada = await Sede.create({
                        nombre: estudianteDTO.sede,
                        NodoId: estudiante.nodoId,
                    });
                    estudiante.sedeId = sedeCreada.id;
                }
            }
            estudiante.estadoId = 4;
            
            await Estudiante.count({ where: { nombreCompleto: estudiante.nombreCompleto } }).then(async count => {
                if (count != 0) {
                    await Estudiante.update(estudiante, {
                        where: {
                            nombreCompleto: estudiante.nombreCompleto,
                            estadoId: 4
                        }
                    })
                } else {
                    await Estudiante.create(estudiante, {
                        where: {
                            estadoId: 4
                        }
                    })
                }
            })
        })
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
            const resultado = await Estudiante.create(request.body);
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
        if('nombreCompleto' in parameters)
            parameters.nombreCompleto = { [Op.startsWith]: parameters.nombreCompleto };
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
        if('nombreCompleto' in parameters)
            parameters.nombreCompleto = { [Op.startsWith]: parameters.nombreCompleto };
        let todosLosEstudiantes = await Estudiante.findAll({
            where: {
                estadoId: 4
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
        if('nombreCompleto' in parameters)
            parameters.nombreCompleto = { [Op.startsWith]: parameters.nombreCompleto };
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
        if('nombreCompleto' in parameters)
            parameters.nombreCompleto = { [Op.startsWith]: parameters.nombreCompleto };
        let todosLosEstudiantes = await Estudiante.findAll({
            where: {
                estadoId: 4
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
}

module.exports = EstudianteService;