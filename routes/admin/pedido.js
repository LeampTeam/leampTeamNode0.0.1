var pedido=require('../../controlador/admin/pedido')
var express = require('express');
var router = express.Router();
var check=require('../../middleware/checkSingIn')


router.get('/grilla',check.checkSignIn,pedido.grilla);
router.get('/pedidos',check.checkSignIn,pedido.pedidos);
router.get('/pedidoDetalle/:id',check.checkSignIn,pedido.getpedidoById);

module.exports = router;