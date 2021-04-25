'use strict'

// importamos modelo de autos

var Auto = require('../models/auto.model');

// Llamamos por medio de parametros el auto que buscamos con la llave "search"

function leerAutos(req, res) {
    var data = req.body.search;

    Auto.find({
        $or: [{ placa: { $regex: data, $options: 'i' } }]
    }, (err, autoFind) => {
        if (err) {
            res.status(500).send({ message: 'Error in the server' });
        } else if (autoFind) {
            res.status(200).send(autoFind);
        } else {
            res.status(200).send({ message: 'Coincidencia no valida' });
        }
    });
}

//Hacemos uso del metodo "save" y pedimos al usuario que llene los parametros para registrar un auto

function guardarAuto(req, res) {
    var auto = new Auto();
    var params = req.body;

    if (params.placa) {

        Auto.findOne({ $or: [{ placa: params.placa }] }, (err, placaFind) => {
            if (err) {
                res.status(500).send({ message: 'Error general en la busqueda' });
            } else if (placaFind) {
                res.send({ message: 'Placa ya registrada, pruebe con otra' });
            } else {
                auto.marca = params.marca;
                auto.modelo = params.modelo;
                auto.año = params.año;
                auto.placa = params.placa;
                auto.estado = params.estado;
                auto.save((err, autoSaved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error in the server' });
                    } else if (autoSaved) {
                        res.status(200).send({ auto: autoSaved });
                    } else {
                        res.status(200).send({ message: 'Error al guardar auto' });
                    }
                });
            }
        });
    } else {
        res.status(200).send({ message: 'Por favor ingrese todos los datos' });
    }
}

//Copiamos en la ruta el id del auto que queremos editar y el los parametros se coloca la nueva información

function editarAuto(req, res) {
    var autoId = req.params.id;
    var update = req.body;

    Auto.findByIdAndUpdate(autoId, update, { new: true }, (err, autoUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error in the server' });
        } else if (autoUpdated) {
            res.status(200).send({ auto_actualizado: autoUpdated });
        } else {
            res.status(200).send({ message: 'Error al actualizar' });
        }
    });
}

//En la ruta se copia el "id" del auto a borrar 

function borrarAuto(req, res) {
    var autoId = req.params.id;

    Auto.findByIdAndRemove(autoId, (err, autoDeleted) => {
        if (err) {
            res.status(500).send({ message: 'Error in the server' });
        } else if (autoDeleted) {
            res.status(200).send({ message: 'Auto eliminado', autoDeleted });
        } else {
            res.status(404).send({ message: 'Error al eliminar' });
        }
    });
}

// exportamos las funciones para hacer uso de ellas

module.exports = {
    leerAutos,
    guardarAuto,
    editarAuto,
    borrarAuto
}