var presentacion=require('../../controlador/admin/presentacion')
var express = require('express');
var router = express.Router();
var check=require('../../middleware/checkSingIn')

router.get('/grilla',check.checkSignIn,presentacion.grilla);
router.get('/presentaciones',check.checkSignIn,presentacion.presentaciones);
router.get('/borrarFragancias/:id'/*falta check.checkSignIn*/,presentacion.borrarFragancias);
router.get('/create',check.checkSignIn,presentacion.create);
router.post('/create',check.checkSignIn,presentacion.createPost);
router.get('/edit/:id',check.checkSignIn,presentacion.edit);
router.post('/edit',check.checkSignIn,presentacion.editPost);
// router.post('/delete',check.checkSignIn,categoria.delete);

module.exports = router;
