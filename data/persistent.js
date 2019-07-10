/*only test local*/

let salarios = [
    { id: 1, salario: 1000 },
    { id: 2, salario: 2000 },
    { id: 3, salario: 3000 },
    { id: 4, salario: 4000 },
    { id: 5, salario: 5000 },
    { id: 6, salario: 6000 },
    { id: 7, salario: 7000 },
    { id: 8, salario: 8000 },
    { id: 9, salario: 9000 },
    { id: 10, salario: 10000 }
];

let products = {
    "ok": true,
    "productos": [{
            "disponible": true,
            "_id": "5c46a71bc0d13400175517bf",
            "nombre": "Cafe",
            "precioUni": 5.1,
            "categoria": null,
            "__v": 0
        },
        {
            "disponible": true,
            "_id": "5c46a72dc0d13400175517c0",
            "nombre": "Leche",
            "precioUni": 5.1,
            "categoria": null,
            "__v": 0
        },
        {
            "disponible": true,
            "_id": "5ced394e6d9c26001782b1b9",
            "nombre": "Leche 5",
            "precioUni": 5.9,
            "categoria": null,
            "__v": 0
        }
    ]
};

module.exports = {
    salarios,
    products
}