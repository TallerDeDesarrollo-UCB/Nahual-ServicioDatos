'use strict';
const express = require('express');
const router = express.Router();
const nombresRutas = require('../resources/nombresRutas');
const inscriptoService = require('../app/services/inscriptoService');

router.get(nombresRutas.emptyUrl, async(request, response) => {
    const inscriptos = await inscriptoService.mostrarInscriptos();
    response.send(inscriptos);
});

router.post(nombresRutas.emptyUrl, async(request, response) => {
    var inscribir;
    if(Array.isArray(request.body)){
        inscribir = await inscriptoService.inscribirVarios(request, response);
    }
    else{
        inscribir = await inscriptoService.inscribir(request, response);
    }   
    response.status(inscribir.result).send(inscribir.message);
});

module.exports = router;