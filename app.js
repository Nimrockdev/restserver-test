const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const date = require('./date/date');
const persistent = require('./data/persistent');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Product = require('./models/products');


require('./config/config.js');

app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

// app.use(allowCrossDomain);

let direccion = { dir: '', lat: 0, lng: 0 };

/*Puerto*/
const port = process.env.PORT || 3000;

/*Entorno*/
const NODE_ENV = process.env.NODE_ENV || 'dev';

let getInfo = async(direccion) => {
    try {
        console.log('Dato introducido: ' + direccion);
        var coors = await lugar.getLugarLatLng(direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);

        return (`El clima en ${coors.direccion} es de ${temp}`);
    } catch (e) {
        return (`No se puede determinar el clima para ${direccion}`);
    }
}

/*Evita el rechazo en la respuesta, data=''*/
var cors = require('cors');
app.use(cors());

mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;
    console.log('BD conectada');
});

app.listen(port, () => {
    console.log('Listening port: ', port);
    date.initServiceData();
});

app.get('/hw', function(req, res) {
    res.json('Hello World, app developed in node! Enviroment: ' + NODE_ENV + ' in port: ' + port);
});

app.get('/time', function(req, res) {
    res.json(date.getTime());
});

app.get('/salarios', function(req, res) {
    res.json(persistent.salarios);
});

app.get('/getTimeServiceData', function(req, res) {
    res.json(date.getTimeServiceData());
});

app.get('/location', function(req, res) {
    let location = req.query.location || 'error';

    if (location != 'error') {

        lugar.getLugar(location).then(mensaje => {
            res.json(mensaje);
        }).catch(e => {
            console.log(Error, e);
            res.json(e);
        })

    } else {
        respuesta = 'The specified location is erroneous';
    }

});

app.get('/weather', function(req, res) {

    let location = req.query.location || 'error';

    if (location != 'error') {

        /*old call*/
        // getInfo(location)
        //     .then(mensaje => console.log(mensaje))
        //     .catch(e => console.log(e));

        lugar.getLugar(location).then(mensaje => {

            var lat = mensaje.lat; //Guardamos las variables en local,desde mensaje, devuelve undefined en lng
            var lng = mensaje.lng;
            var loc = mensaje.direccion;

            clima.getClima(lat, lng).then(mensaje => {
                res.send(`La temperatura en ${loc} es de ${mensaje} ºC`)
            }).catch(e => {
                console.log(Error, e);
                res.json(e);
            })

        }).catch(e => {
            console.log(Error, e);
            res.json(e);
        })

    } else {
        var respuesta = 'The specified location is erroneous';
        console.log(respuesta);
        res.send(respuesta);
    }

});

//Obtener todos los productos
app.get('/products', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Product.find({ disponible: true })
        .skip(desde)
        .limit(5)
        // .populate('usuario', 'nombre email')
        // .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            res.json({
                ok: true,
                productos
            });

        })
});