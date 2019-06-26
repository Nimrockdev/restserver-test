const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const date = require('./date/date');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados


let salarios = [
    { id: 1, salario: 1000 },
    { id: 2, salario: 2000 }
];

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
    res.json(salarios);
});

app.get('/getTimeServiceData', function(req, res) {
    res.json(date.getTimeServiceData());
});

app.get('/weather', function(req, res) {
    res.json('weather');
});

app.get('/location', function(req, res) {
    let location = req.query.location || 'error';

    if (location != 'error') {

        lugar.getLugar(location).then(mensaje => {
            // console.log(mensaje);
            res.json(mensaje);
        }).catch(e => {
            console.log(Error, e);
            res.json(e);
        })

    } else {
        respuesta = 'The specified location is erroneous';
    }

});