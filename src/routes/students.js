'use strict';
const express = require('express');
const router = express.Router();
const routeNames = require('../resources/routeNames');
const studentService = require('../app/services/studentService');

router.get(routeNames.emptyUrl, async (request, response) => {
	const allGraduates = await studentService.findGraduatedStudents(request, response);
	response.set('Content-type', 'application/json');
	response.end(JSON.stringify(allGraduates));
});

router.put('/:id',async (request,response)=>{
    try {
        const result = await studentService.updateStudent(request,response);
        response.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;