'use strict'

var express = require('express');
var autoController = require('../Controllers/auto.controller');

var app = express.Router();

//Rutas para acceder a las funcione del controlador de Autos

app.get('/leerAuto', autoController.leerAutos);
app.post('/guardarAuto', autoController.guardarAuto);
app.put('/editarAuto/:id', autoController.editarAuto);
app.delete('/borrarAuto/:id', autoController.borrarAuto);


module.exports = app;
