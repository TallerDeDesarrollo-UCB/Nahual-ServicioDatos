'use strict';
const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const nombresRutas = require('../resources/nombresRutas');
const estudianteService = require('../app/services/estudianteService');

var jsonParser = bodyParser.json()

router.get(nombresRutas.emptyUrl + '/paginacion', async(request, response) => {
    let parameters = request.query;
    parameters.estadoId = 4;
    parameters.pagina = Math.abs(parameters.pagina);
    parameters.pagina = parameters.pagina || 1;
    const result = await estudianteService.encontrarEstudiantesEgresades(parameters);
    response.set('Content-type', 'application/json');
    response.end(JSON.stringify(result));
});


router.get('/DTO/paginacion', async(request, response) => {
    let parameters = request.query;
    parameters.estadoId = 4;
    parameters.pagina = Math.abs(parameters.pagina);
    parameters.pagina = parameters.pagina || 1;
    const result = await estudianteService.encontrarEstudiantesEgresadesDTO(parameters);
    response.set('Content-type', 'application/json');
    response.end(JSON.stringify(result));
});


router.get(nombresRutas.estudiantes.egresades.desempleados.url +'/paginacion', async(request, response) => {
    let parameters = request.query;
    parameters.estadoId = 4;
    parameters.esEmpleado = false;
    parameters.pagina = Math.abs(parameters.pagina);
    parameters.pagina = parameters.pagina || 1;
    const result = await estudianteService.encontrarEstudiantesEgresades(parameters);
    response.send(result);
});

router.get(nombresRutas.estudiantes.egresades.desempleados.url + '/DTO/paginacion', async(request, response) => {
    let parameters = request.query;
    parameters.estadoId = 4;
    parameters.esEmpleado = false;
    parameters.pagina = Math.abs(parameters.pagina);
    parameters.pagina = parameters.pagina || 1;
    const result = await estudianteService.encontrarEstudiantesEgresadesDTO(parameters);
    response.send(result);
});

router.get(nombresRutas.emptyUrl, async(request, response) => {
    let parameters = request.query;
    parameters.estadoId = 4;
    const result = await estudianteService.encontrarEgresadesSinPaginacion(parameters);
    response.set('Content-type', 'application/json');
    response.end(JSON.stringify(result));
});


router.get('/DTO', async(request, response) => {
    let parameters = request.query;
    parameters.estadoId = 4;
    const result = await estudianteService.encontrarEgresadesSinPaginacionDTO(parameters);
    response.set('Content-type', 'application/json');
    response.end(JSON.stringify(result));
});


router.get(nombresRutas.estudiantes.egresades.desempleados.url, async(request, response) => {
    let parameters = request.query;
    parameters.estadoId = 4;
    parameters.esEmpleado = false;
    const result = await estudianteService.encontrarEgresadesSinPaginacion(parameters);
    response.send(result);
});

router.get(nombresRutas.estudiantes.egresades.desempleados.url + '/DTO', async(request, response) => {
    let parameters = request.query;
    parameters.estadoId = 4;
    parameters.esEmpleado = false;
    const result = await estudianteService.encontrarEgresadesSinPaginacionDTO(parameters);
    response.send(result);
});

router.post(nombresRutas.emptyUrl, jsonParser, async(request, response) => {
    const status = await estudianteService.registrarEstudiantesEgresadesDTO(request, response);
    response.status(status).send("SUCCESS");
});

router.get('/:id', async(request, response) => {
    const todosLosEgresades = await estudianteService.encontrarEgresadePorId(request.params.id);
    response.send(todosLosEgresades);
});

router.get('/:id/DTO', async(request, response) => {
    const todosLosEgresades = await estudianteService.encontrarEgresadePorIdDTO(request.params.id);
    response.send(todosLosEgresades);
});

module.exports = router;