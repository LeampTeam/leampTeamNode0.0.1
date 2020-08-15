var tamano=require('../../controlador/admin/tamano')
var express = require('express');
var router = express.Router();
var check=require('../../middleware/checkSingIn')

router.get('/grilla',check.checkSignIn,tamano.grilla);
router.get('/tamanos',check.checkSignIn,tamano.tamanos);
router.get('/borrarFragancias/:id'/*falta check.checkSignIn*/,tamano.borrarFragancias);
router.get('/create',check.checkSignIn,tamano.create);
router.post('/create',check.checkSignIn,tamano.createPost);
router.get('/edit/:id',check.checkSignIn,tamano.edit);
router.post('/edit',check.checkSignIn,tamano.editPost);
// router.post('/delete',check.checkSignIn,categoria.delete);

module.exports = router;
