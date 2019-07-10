let Product = require('../models/products');
const persistent = require('../data/persistent');




const allProducts = persistent.products;


// const getClima = async(lat, lng) => {
//     let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=52d74726c8c4f3f652068bfe593e2684`);
//     return resp.data.main.temp;
// }

module.exports = {
    allProducts
}


// app.get('/productos', verificaToken, (req, res) => {
//     let desde = req.query.desde || 0;
//     desde = Number(desde);

//     Producto.find({ disponible: true })
//         .skip(desde)
//         .limit(5)
//         .populate('usuario', 'nombre email')
//         .populate('categoria', 'descripcion')
//         .exec((err, productos) => {
//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     err
//                 })
//             };

//             res.json({
//                 ok: true,
//                 productos
//             });

//         })
// });