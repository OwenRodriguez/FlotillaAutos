'use strict'
/*
Esta clase nos permite utilizar los metodos para manipular los datos 
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var autosRoutes = require('./routes/autos.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/administrador', autosRoutes);

module.exports = app;