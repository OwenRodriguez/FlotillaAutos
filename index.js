'use strict'

/*En esta clase se define la conexión con la base de datos y se declara el puerto por el 
cual se debe acceder*/

var mongoose = require('mongoose');
var app = require('./app');
var port = 3300;

mongoose.Promise = global.Promise;

/**
 * Acontinuación se realiza las validaciones que comprueben que estamos conectados con 
 * la base de datos
 */
mongoose.connect('mongodb://127.0.0.1:27017/flotillaAutos', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('Conexion exitosa a la BD');
        app.listen(port, () => {
            console.log('Servidor de express corriendo');
        });
    }).catch(err => {
        console.log('Error al conectarse a la BD', err);
    });
