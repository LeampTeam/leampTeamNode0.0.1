var express = require('express');
var router = express.Router();
var articulos=require('../../controlador/frontEnd/artiuclos')

router.get('/',articulos.mainPage );
router.get('/nuestrosArticulos/:id',articulos.getproductos );
router.get('/promociones',articulos.getproductosPuntera );
router.get('/enviarCarroCompra/:id',articulos.llenarCarroCompra );
router.get('/borrarItem/:id',articulos.eliminarItem)
router.get('/borrarItemCarro/:id',articulos.eliminarItemCarro)
router.get('/carroCompra',articulos.verCarroCompra)
router.get('/detalleProducto/:id',articulos.getproductoById)
router.post('/agregarCantidad',articulos.agregarCantidad),
router.post('/enviarMail',articulos.enviarMail),
router.post('/enviarMailSugerencia',articulos.mailContacto),
router.post('/obtenerProducto',articulos.getProduct),
router.post('/buscarPorductos',articulos.buscarProductos),

router.get('/contacto',articulos.contacto),




module.exports = router;