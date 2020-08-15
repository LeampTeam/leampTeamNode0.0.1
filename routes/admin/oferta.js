var oferta=require('../../controlador/admin/oferta')
var express = require('express');
var router = express.Router();
var check=require('../../middleware/checkSingIn')

router.get('/oferta',check.checkSignIn,oferta.oferta);
router.get('/guardarProductoOferta/:id',check.checkSignIn,oferta.guardarProductoOferta);
router.get('/sacarDeOferta/:id',check.checkSignIn,oferta.sacarOferta);
// router.get('/categorias',check.checkSignIn,categoria.categorias);
// router.get('/create',check.checkSignIn,categoria.create);
// router.post('/create',check.checkSignIn,categoria.createPost);
// router.get('/edit/:id',check.checkSignIn,categoria.edit);
// router.post('/edit',check.checkSignIn,categoria.editPost);
// router.post('/delete',check.checkSignIn,categoria.delete);

module.exports = router;
