const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const date = require('./date/date');
const persistent = require('./data/persistent');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

let direccion = { dir: '', lat: 0, lng: 0 };

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

/*call old*/
// getInfo(argv.direccion)
//     .then(mensaje => console.log(mensaje))
//     .catch(e => console.log(e));


app.listen(3000, () => {
    console.log('Listening port: ', 3000);
    date.initServiceData();
});

app.get('/hw', function(req, res) {
    res.json('Hello World, app developed in node!');
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