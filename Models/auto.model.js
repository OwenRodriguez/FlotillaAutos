'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// se define modelo de datos para Autos

var autoSchema = Schema({
    marca: String,
    modelo: String,
    año: Number,
    placa: String,
    estado: String
})

// Exportamos el modelo para utilizarlo fuera de clase

module.exports = mongoose.model('auto', autoSchema);