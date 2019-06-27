var loading = document.getElementById('loading');
var mensaje = document.getElementById('mensaje');

let salarios = [
    { id: 1, salario: 1000 },
    { id: 2, salario: 2000 },
    { id: 3, salario: 3000 }
];



// console.log(salarios);
// for (contador = 0; contador < 7; contador++) {
//     document.write("El valor de la posición [" + contador + "] es [" + aDias[contador] + "]<br/>");
// }

// for (contador = 0; salarios.length < 7; contador++) {
//     document.write("El valor de la posición [" + contador + "] es [" + salarios[contador] + "]<br/>");
//     document.write(salarios[contador]);
// }

var boton = document.getElementById('helloWorld');
boton.addEventListener('click', function() {
    loading.style.display = 'block';
    axios.get('https://restserver-test-jsg.herokuapp.com/hw', {
            responseType: 'json'
        })
        .then(function(res) {
            if (res.status == 200) {
                console.log(res.data);
                mensaje.innerHTML = res.data;

            }
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        })
        .then(function() {
            loading.style.display = 'none';
        });
});

var boton = document.getElementById('salarios');
boton.addEventListener('click', function() {
    loading.style.display = 'block';
    axios.get('https://restserver-test-jsg.herokuapp.com/salarios', {
            responseType: 'json',
        })
        .then(function(res) {
            if (res.status == 200) {
                console.log(res.data);
                mensaje.innerHTML = JSON.stringify(res.data, undefined, 2);
            }
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        })
        .then(function() {
            loading.style.display = 'none';
        });
});

var boton = document.getElementById('getTimeServiceData');
boton.addEventListener('click', function() {
    loading.style.display = 'block';
    axios.get('https://restserver-test-jsg.herokuapp.com/getTimeServiceData', {
            responseType: 'json',
        })
        .then(function(res) {
            if (res.status == 200) {
                console.log(res);
                mensaje.innerHTML = res.data;
            }
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        })
        .then(function() {
            loading.style.display = 'none';
        });
});

var boton = document.getElementById('location');
let config = {
    headers: {
        location: "Castelldefels",
    }
}

boton.addEventListener('click', function() {
    loading.style.display = 'block';
    axios.get('https://restserver-test-jsg.herokuapp.com/location?location=Castelldefels', {
            responseType: 'json'
        })
        .then(function(res) {
            if (res.status == 200) {

                console.log(res.data);

                mensaje.innerHTML = JSON.stringify(res.data, undefined, 2);
            }
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        })
        .then(function() {
            loading.style.display = 'none';
        });
});

var boton = document.getElementById('getTime');
boton.addEventListener('click', function() {
    loading.style.display = 'block';
    axios.get('https://restserver-test-jsg.herokuapp.com/Time', {
            responseType: 'json',

        })
        .then(function(res) {
            if (res.status == 200) {
                console.log(res.data);
                mensaje.innerHTML = JSON.stringify(res.data, undefined, 2);
            }
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        })
        .then(function() {
            loading.style.display = 'none';
        });
});