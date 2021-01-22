var Producto = require('../../model/producto');
var Categoria = require('../../model/categoria');
var Fragancia = require('../../model/fragancia');
var Marca = require('../../model/marca');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
const Tamano = require('../../model/tamano');
const Presentacion = require('../../model/presentacion');
var pdf = require('html-pdf');


function grilla(req, res) {
    var data = {
        name: req.session.nameuser,
        id: req.session.iduser,
        img: req.session.imguser,
        email: req.session.email
    }
    res.render('admin/producto/produGrilla', {
        data
    });

}

function productos(req, res) {
    let search = req.query.search.value
    let start = parseInt(req.query.start)
    let length = parseInt(req.query.length)
    // $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }

    Producto.find({
                eliminado: {
                    $ne: true
                },
                $or: [{
                    name: new RegExp(search, "i")
                }, {
                    code: new RegExp(search, "i")
                }]
            },
            '_id price code stock categoria.name img estaEnPuntera estaEnOferta')
        .sort({
            CreateAt: 'desc'
        })
        .populate('categoria')
        .exec((err, producto) => {

            var prodfilt = producto.slice(start, (start + length))


            res.json({
                data: prodfilt,
                draw: req.draw,
                recordsTotal: producto.length,
                recordsFiltered: producto.length,

            })
        })
    }

function create(req, res) {
    var data = {
        name: req.session.nameuser,
        id: req.session.iduser,
        img: req.session.imguser,
        email: req.session.email
    }


    let producto = new Producto()
    producto.categoria = new Categoria()
    producto.fragancia = new Fragancia()
    producto.tamano = new Tamano()
    producto.presentacion = new Presentacion()
    Categoria.find({}, function (error, categorias) {
        Fragancia.find({}, function (error, fragancias) {
            Tamano.find({}, function (error, tamanos) {
                Presentacion.find({}, function (error, presentaciones) {
                    res.render('admin/producto/produCreate', {
                        data,
                        producto,
                        categorias,
                        fragancias,
                        tamanos,
                        presentaciones
                    });
                })
            })
        })
    })

}

async function createPost(req, res) {
    let params = req.body;

    let producto = new Producto();

    if (params.checkFragancia == 'on') {


        producto.checkFragancia = true
        producto.fragancia = params.fragancia != "0" ? params.fragancia : new Fragancia();

    } else {
        producto.checkFragancia = false
        producto.fragancia = new Fragancia()
    }
    if (params.checkTamano == 'on') {


        producto.checkTamano = true
        producto.tamano = params.tamano != "0" ? params.tamano : new Tamano();

    } else {
        producto.checkTamano = false
        producto.tamano = new Tamano()
    }
    if (params.checkPresentacion == 'on') {


        producto.checkPresentacion = true
        producto.presentacion = params.presentacion != "0" ? params.presentacion : new Presentacion();

    } else {
        producto.checkPresentacion = false
        producto.presentacion = new Presentacion()
    }
    producto.name = params.name;

    producto.description = params.description;
    producto.stock = params.stock;
    producto.code = params.code
    producto.price = (parseFloat(params.priceMayor) * parseFloat(params.porcentaje) / 100) + parseFloat(params.priceMayor)
    producto.priceMayor = params.priceMayor;
    producto.porcentaje = params.porcentaje;

    producto.estaEnPuntera = 'false'
    producto.estaEnOferta = 'false'

    producto.categoria = params.categoria != "0" ? params.categoria : new Categoria;

    producto.img = null
    producto.CreateAt = moment().unix();
    producto.eliminado = false
    if (true) {
        producto.save((err, userStored) => {
            if (err) {
                var data = {
                    name: req.session.nameuser,
                    id: req.session.iduser,
                    img: req.session.imguser,
                    email: req.session.email
                }
                Categoria.find({}, function (error, categorias) {
                    Fragancia.find({}, function (error, fragancias) {
                        Marca.find({}, function (error, marcas) {
                            return res.render('admin/producto/produCreate', {
                                data,
                                producto,
                                categorias,
                                fragancias,
                                marcas,
                                message: 'Completa todos los campos'
                            });
                        })
                    })
                })
            }

            if (userStored) {
                res.redirect('/admin/producto/grilla');
            } else {
                res.render('admin/producto/produCreate', {
                    message: 'Error al guardar'
                })
            }
        })
    } else {
        var data = {
            name: req.session.nameuser,
            id: req.session.iduser,
            img: req.session.imguser,
            email: req.session.email
        }
        Categoria.find({}, function (error, categorias) {
            Fragancia.find({}, function (error, fragancias) {
                Marca.find({}, function (error, marcas) {
                    res.render('admin/producto/produCreate', {
                        data,
                        producto,
                        categorias,
                        fragancias,
                        marcas,
                        message: 'Completa todos los campos'
                    });
                })
            })
        })
    }
}

function edit(req, res) {
    let idEdit = req.params.id

    var data = {
        name: req.session.nameuser,
        id: req.session.iduser,
        img: req.session.imguser,
        email: req.session.email
    }


    Producto.findById(idEdit, function (err, producto) {
        Categoria.find({}, function (error, categorias) {
            Fragancia.find({}, function (error, fragancias) {
                Tamano.find({}, function (error, tamanos) {
                    Presentacion.find({}, function (error, presentaciones) {
                        if (producto.fragancia == null) {
                            producto.fragancia = new Fragancia()
                        }
                        if (producto.tamano == null) {
                            producto.tamano = new Tamano()
                        }
                        if (producto.presentacion == null) {
                            producto.presentacion = new Presentacion()
                        }

                        res.render('admin/producto/produEdit', {
                            data,
                            producto,
                            categorias,
                            fragancias,
                            tamanos,
                            presentaciones
                        });
                    })
                })
            })
        })
    }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
}

function getProducts(req, res) {
    let search = req.body.search

    Producto.find({
        description: new RegExp(search, "i")
    }, function (err, producto) {

        return res.status(200).send({
            producto
        })
    })
}

function getProductsPuntera(req, res) {
    let search = req.body.search
    let cate = req.body.cate

    Producto.find({
            categoria: cate,
            description: new RegExp(search, "i")
        })
        .exec(function (err, producto) {
            return res.status(200).send({
                producto
            })
        })
    }

function getProduct(req, res) {
    let id = req.body.id
    Producto.findById(id, function (err, producto) {
        return res.status(200).send({
            producto
        })
    })
}

async function editPost(req, res) {
    let params = req.body
    let producto = new Producto();

    if (params.checkFragancia == 'on') {
        producto.checkFragancia = true
        producto.fragancia = params.fragancia != "0" ? params.fragancia : new Fragancia();

    } else {
        producto.checkFragancia = false
        producto.fragancia = new Fragancia()
    }
    if (params.checkTamano == 'on') {

        producto.checkTamano = true
        producto.tamano = params.tamano != "0" ? params.tamano : new Tamano();
    } else {
        producto.checkTamano = false
        producto.tamano = new Tamano()
    }
    if (params.checkPresentacion == 'on') {
        producto.checkPresentacion = true
        producto.presentacion = params.presentacion != "0" ? params.presentacion : new Presentacion();

    } else {
        producto.checkPresentacion = false
        producto.presentacion = new Presentacion()
    }
    producto.name = params.name;

    producto.description = params.description.toString();
    producto.stock = params.stock;
    producto.code = params.code
    producto.price = (parseFloat(params.priceMayor) * parseFloat(params.porcentaje) / 100) + parseFloat(params.priceMayor)
    producto.priceMayor = params.priceMayor;
    producto.porcentaje = params.porcentaje;
    producto.categoria = params.categoria != "0" ? params.categoria : new Categoria;
    let pro = {
        name: producto.name,
        code: producto.code,
        description: producto.description,
        stock: producto.stock,
        price: producto.price,
        priceMayor: producto.priceMayor,
        checkPresentacion: producto.checkPresentacion,
        checkTamano: producto.checkTamano,
        checkFragancia: producto.checkFragancia,
        presentacion: producto.presentacion,
        tamano: producto.tamano,
        fragancia: producto.fragancia,
        categoria: producto.categoria,
    }

    Producto.findByIdAndUpdate(params.id, pro, {
        new: true
    }, (err, userUpdated) => {
        if (err) return res.status(500).send({
            message: 'Erro en la peticion'
        })

        if (!userUpdated) return res.status(404).send({
            message: 'No se ha podido Actualizar'
        })

        return res.redirect('/admin/producto/grilla')
    })
}

function uploadImage(req, res) {
    console.log(req.body.productId)
    var productid = req.body.productId
    if (req.files) {
        var file_path = req.files.file.path;
        console.log(file_path)
        var file_split = file_path.split('/');
        console.log(file_split)
        var file_name = file_split[2];
        console.log(file_name)
        var ext_split = file_name.split('.');
        console.log(ext_split)
        var file_ext = ext_split[1]
        console.log(req.file)

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Producto.findById(productid, (err, pro) => {
                if (pro.img != null) {
                    if (pro.img != 'imagenotfound.png') {
                        fs.unlinkSync('./imagenes/producto/' + pro.img)
                    }
                }
            })
            Producto.findByIdAndUpdate(productid, {
                img: file_name
            }, {
                new: true
            }, (err, productUpdated) => {

                if (err) return res.status(500).send({
                    message: 'Erro en la peticion'
                })
                if (!productUpdated) return res.status(404).send({
                    message: 'No se ha podido Actualizar'
                })
                return res.status(200).send(file_name)
            })
        } else {
            removeFilesOfUploads(res, file_path, 'La extencion no es valida')

        }
    } else {
        return res.status(200).send({
            message: 'No se han subido archivos'
        })
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.img;
    console.log(imageFile)
    var pathFile = './imagenes/producto/' + imageFile

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile))
        } else {
            res.status(400).send({
                message: 'El archivo no fue encotrado'
            })
        }
    })
}


function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({
            message: message
        })
    })
}

/* AQUI BORRAMOS LOS PRODUCTOS DE LAS LISTAS DEL SERVIDOR */
function borrarProducto(req, res) {
    console.log(req)
    let IdProductos = req.params.id;

    Producto.findByIdAndUpdate(IdProductos, {
        eliminado: true
    }, {
        new: true
    }, (err, userUpdated) => {
        if (err) return res.status(500).send({
            message: 'Error en la peticion'
        })

        if (!userUpdated) return res.status(404).send({
            message: 'No se ha podido Actualizar'
        })

        return res.redirect('/admin/producto/grilla')

    })


}

/* ACA CREAMOS LA FECHA SEGUN LA FECHA DEL SERVIDOR */
function obtenerFecha() {

    let fecha = new Date();
    let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado']
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
        'Noviembre', 'Diciembre'
    ]
    let fechaLista = fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " +
        fecha.getFullYear();

    return fechaLista;
}

let renglonesPorHoja = 35;
let renglonesSobrantes = 0;


/* AQUI SE CARGAR LAS TABLAS DE LOS PRODUCTOS SEGUN EL NOMBRE DE LA CATEGORIA */
function tablaDePrecio(productos) {

    progroupFrag = productos.reduce((r, a) => {

        r[a.categoria.name] = [...r[a.categoria.name] || [], a];

        return r;
    }, {});
    console.log(progroupFrag)
    progrouppresentacion = productos.reduce((r, a) => {
        if (a.presentacion != null) {
            r[a.presentacion.name] = [...r[a.presentacion.name] || [], a];
        }
        return r;
    }, {});

    let filas = '';
    for (const a in progroupFrag) {
        if (a == 'Detergentes' || a == 'Jabones Liquidos para Ropa' || a == 'Suavizantes para Ropa') {
            filas += tablaDetergenteJabonLiquidoSuavizanteCLoroLavandina(productos, progrouppresentacion, a)
        } else if (a == 'Quita Manchas') {
            filas += tablaQuitaManchasDesengrasantes(productos, a)
        } else if (a == 'Cloro y Lavandinas') {
            filas += tablaDetergenteJabonLiquidoSuavizanteCLoroLavandina(productos, progrouppresentacion, a)
        } else if (a == 'Desengrasantes') {
            filas += tablaQuitaManchasDesengrasantes(productos, a)
        }
    }
    return filas;
}

/* TABLA DETERGENTE JABON LIQUIDO SUAVIZANTE ETC... */
function tablaDetergenteJabonLiquidoSuavizanteCLoroLavandina(productos, progrouppresentacion, cate) {
    let regsob = renglonesPorHoja;
    let renglonesOcupados = 0;
    let filas = '';
    filas += `
            <h1 id="nombreCategoria">
                ${cate} 
            </h1>
            
            <table class="table table-sm" id="listaPrecios">
                 <tr class="tamanoEncabezadoLista">
                    <th></th>
                    <th style="text-align: center;"> Minimo 200 litros<br>(sin envase) </th> 
                    <th style="text-align: center;"> Minimo 20 litros<br>(sin envase) </th> 
                    <th style="text-align: center;"> <br>5 Litros envasado </th>
                </tr>               
            `
    let nameanterior = '';
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].name != nameanterior) {
            if (productos[i].categoria.name == cate) {
                renglonesOcupados++
                filas += `
                <tr class="estiloListaPrecios">
                    <td style="font-size: 12px;"> ${productos[i].name} </td> 
                `
                for (const b in progrouppresentacion) {
                    if (productos[i].presentacion != null && productos[i].presentacion.name == b) {
                        filas += `<td style="text-align: center; font-size: 12px;"> ${productos[i].price} </td>`
                        console.log(b)
                        console.log(productos[i].progrouppresentacion)
                    }
                }
                filas += `</tr>`
            }
        }

        nameanterior = productos[i].name;
    }
    filas += `</table>`

    renglonesOcupados = renglonesOcupados + 5;

    if (renglonesOcupados > regsob) {
        var br = '';
        for (let i = 0; i < renglonesSobrantes; i++) {
            br += `<br>`;
        }
        filas = br + filas;
        renglonesPorHoja = 45
    }

    renglonesSobrantes = renglonesPorHoja - renglonesOcupados;
    renglonesPorHoja = renglonesSobrantes;
    return filas;
}

/* TABLA QUITA MANCHA Y DESENGRASANTE */
function tablaQuitaManchasDesengrasantes(productos, cate) {
    let regsob = renglonesPorHoja;
    let renglonesOcupados = 0;
    let filas = '';

    filas += `
            <h1 id="nombreCategoria">
                ${cate} 
            </h1>
            
            <table class="table table-sm" id="listaPrecios">
                 <tr>
                    <th></th>
                    <th style="text-align: center;"> 5 Litros envasado </th>
                </tr> 
            `
    let nameanterior = '';
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].categoria.name == cate) {
            renglonesOcupados++
            filas += `
                <tr>
                    <td style="font-size: 12px;"> ${productos[i].name} </td> 
                    <td style="text-align: center; font-size: 12px;"> ${productos[i].price} </td> 
            `
            filas += `</tr>`
        }
    }
    filas += `</table>`
    renglonesOcupados = renglonesOcupados + 5;

    if (renglonesOcupados > regsob) {
        var br = '';
        for (let i = 0; i < renglonesSobrantes; i++) {
            br += `<br>`;
        }
        filas = br + filas;
        renglonesPorHoja = 45
    }

    renglonesSobrantes = renglonesPorHoja - renglonesOcupados;
    renglonesPorHoja = renglonesSobrantes;
    return filas;
}

/* CARGA DE ENCABEZADO EN CADA HOJA */
let result = `<img src='file:///C:/Users/DIEGO/Desktop/LeamTeam/LeampTeam001/leampTeamNode0.0.1/public/images/logoCompleto_conFondoBlanco.png' width="180px" height="100px"/>`
let resultado = `

		            <div id="fecha" style="width: 95%; margin-top:20px ;text-align: right; font-family:Verdana; position:absolute;">
			            ${obtenerFecha()}
                    </div> 
                    <div style="margin-left:50px; margin-top: -30px">
                        ${result}
                    </div>
`
/* LISTA DE PRECIOS EN PDF */
function crearListaDePrecios(req, res) {
    let progroupFrag = null
    Producto.find({
            eliminado: {
                $ne: true
            }
        })
        .populate('categoria').populate('presentacion')
        .exec((err, productos) => {
            //let linkBoot = 'href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"'


            var options = {
                "border": {
                    "top": "-10px",
                    "right": "",
                    "bottom": "",
                    "left": ""
                },
                "format": 'A4',
                "header": {
                    "width": "10px",
                    "height": "110px",
                    "contents": ``
                },

                "body": {
                    "width": "",
                    "height": "",
                },

                "footer": {
                    "height": "20px"
                },
                "base": '',

                "type": "pdf",
                "quality": "300",
            };






            let htmlPrecios =

                `
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="http://localhost:3000/stylesheets/estilos.css"> 
                    <link rel="stylesheet" href="http://localhost:3000/stylesheets/bootstrap.min.css"> 
                </head>

                <body class="container">
                
	            <div id="cuerpo">
		            <div id="pageHeader">
                        ${resultado}
                    </div>
    
                    <header class="container-fluid">
                    
		                <div class="text-center" id="encabezado">
			                <b style="font-size:30px"> Lista de precios </b> </br>
			                Vendedores: Diego Ziraldo <br />
			                Llamadas y WhatsApp: 15-5097-3167 - Email: limpteamventas@gmail.com <br />
			                Nos encontramos en la zona de Caseros. Buenos Aires. <br />
			                <b> Entregas a domicilio sin cargo </b>

		                </div>
	                </header>

                <div id="tablas">
                    ${tablaDePrecio(productos)}
                </div>
            </div>
            </body>
            </html>
       `
            pdf.create(htmlPrecios, options).toFile('public/listaPrecios/pdfGenerado/lista.pdf', function (err, res) {
                renglonesPorHoja = 35;

                renglonesSobrantes = 0;



            });
        })

}


module.exports = {
    grilla,
    productos,
    create,
    createPost,
    edit,
    editPost,
    getProduct,
    getProducts,
    uploadImage,
    getImageFile,
    getProductsPuntera,
    borrarProducto,
    crearListaDePrecios

}