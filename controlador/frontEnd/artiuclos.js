var Producto= require('../../model/producto');
var Categoria= require('../../model/categoria');
var Sugerencia= require('../../model/sugerencias');

var Estado= require('../../model/estado');
var envioMail=require('../../service/envioMail')
var numeroRemito=require('../../service/generarNroRemito')
var Pedido= require('../../model/pedido');
var itemPedido= require('../../model/productoItem');
var moment = require('moment')
var pdf = require('html-pdf');



function mainPage(req,res){
    if(!req.session.productocomprado){
        req.session.productocomprado=[]
    }
    let total=0
        for(let i=0;i<req.session.productocomprado.length;i++){
            total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
        }
        req.session.total=total.toFixed(2)
        Producto.find({eliminado:{ $ne: true },estaEnPuntera:"true"})
            .exec((err,producto)=>{
                let productosVista=[]
               for(let i=0;i<producto.length;i++){
                   produ={
                       id:producto[i].id,
                       name:producto[i].name,
                       description:producto[i].description,
                    //    code:producto[i].code,
                       price:producto[i].price,
                       img:producto[i].img
    
                   }
                   productosVista.push(produ)
               }
               Producto.find({eliminado:{ $ne: true },estaEnOferta:"true"})
                .exec((err,producto)=>{
                let produOferVista=[]
               for(let i=0;i<producto.length;i++){
                   produ={
                       id:producto[i].id,
                       name:producto[i].name,
                       description:producto[i].description,
                    //    code:producto[i].code,
                    //    price:producto[i].price,
                       img:producto[i].img
    
                   }
                   produOferVista.push(produ)

               }
               Categoria.find({eliminado:{ $ne: true }})
                
                .exec((err,cat)=>{
                let cateVista=[]
               for(let i=0;i<cat.length;i++){
                   cate={
                       id:cat[i].id,
                       name:cat[i].name,
                       
                    //    code:producto[i].code,
                    //    price:producto[i].price,
                       img:cat[i].img
    
                   }
                   cateVista.push(cate)
                  
               }
               Producto.find({eliminado:{ $ne: true }}).limit(7)
                .exec((err,producto)=>{
                let produmasvendidos=[]
               for(let i=0;i<producto.length;i++){
                   produ={
                       id:producto[i].id,
                       name:producto[i].name,
                       description:producto[i].description,
                       code:producto[i].code,
                       price:producto[i].price,
                       img:producto[i].img
    
                   }
                   produmasvendidos.push(produ)

               }
               res.render('frontEnd/pageMain',{produmasvendidos,productosVista,produOferVista,cateVista,
                verChango:req.session.productocomprado,total:req.session.total})  
            })
            })
        })
    })
    
}
function contacto(req,res){
    if(!req.session.productocomprado){
        req.session.productocomprado=[]
    }
    let total=0
        for(let i=0;i<req.session.productocomprado.length;i++){
            total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
        }
        req.session.total=total.toFixed(2)
    Categoria.find({eliminado:{ $ne: true }})
                .exec((err,cat)=>{
                let cateVista=[]
               for(let i=0;i<cat.length;i++){
                   cate={
                       id:cat[i].id,
                       name:cat[i].name,
                       
                    //    code:producto[i].code,
                    //    price:producto[i].price,
                       img:cat[i].img
    
                   }
                   cateVista.push(cate)
                  
                }
    res.render('frontEnd/contacto',{cateVista,verChango:req.session.productocomprado,total:req.session.total})
    })
}
function mailContacto(req,res){
    var params=req.body
    let sugerencia=new Sugerencia()
    sugerencia.name=params.name
    sugerencia.email=params.email
    sugerencia.phone=params.phone
    sugerencia.subject=params.subject
    sugerencia.message=params.message
    sugerencia.CreateAt=moment().unix()
    sugerencia.save((err,userStored)=>{
        res.render('frontEnd/contacto')
    })

}
function getproductos(req,res){
    let cateid=req.params.id
    if(!req.session.productocomprado){
        req.session.productocomprado=[]
    }
    let total=0
        for(let i=0;i<req.session.productocomprado.length;i++){
            total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
        }
        req.session.total=total.toFixed(2)
    if(cateid=='1'){
        Producto.find({eliminado: { $ne: true }},
            ).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
           
                .exec((err,productos)=>{

                    let productosVista=[]
                    for(let i=0;i<productos.length;i++){
                        let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                        let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                        let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                            produ={
                                id:productos[i].id,
                                name:productos[i].name,
                                description:productos[i].description,
                                code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                                price:productos[i].price,
                                categoria:productos[i].categoria!=null?productos[i].categoria.name:"",
                                categoriaid:productos[i].categoria!=null?productos[i].categoria.id:"",
                                img:productos[i].img
             
                            }
                        productosVista.push(produ)
                    }
                    Categoria.find({eliminado:{ $ne: true }})
                
                    .exec((err,cat)=>{
                    let cateVista=[]
                   for(let i=0;i<cat.length;i++){
                       cate={
                           id:cat[i].id,
                           name:cat[i].name,
                           
                        //    code:producto[i].code,
                        //    price:producto[i].price,
                           img:cat[i].img
        
                       }
                       cateVista.push(cate)
                    
                        
                    }
                    Producto.find({},
                        ).populate('fragancia').populate('tamano').populate('presentacion')
                            .exec((err,productos)=>{
                                let progroupFrag=null
                                let progroupTam=null
                                let progroupLitr=null
                              
                                if(productos[0].checkFragancia){
                                     progroupFrag = productos.reduce((r, a) => {
                                        if(a.fragancia!=null){
                                        r[a.fragancia.name] = [...r[a.fragancia.name] || [], a];
                                        }
                                        return r;
                                    }, {});
                                }
                                if(productos[0].checkTamano){
                                    progroupTam = productos.reduce((r, a) => {
                                        if(a.tamano!=null){
                                       r[a.tamano.name] = [...r[a.tamano.name] || [], a];
                                        }
                                       return r;
                                   }, {});
                               }
                               if(productos[0].checkPresentacion){
                                progroupLitr = productos.reduce((r, a) => {
                                    if(a.presentacion!=null){
                                   r[a.presentacion.name] = [...r[a.presentacion.name] || [], a];
                                    }
                                   return r;
                               }, {});
                           }
                    res.render('frontEnd/articulos',{cateid:'',titulo:'Todos los productos',productosVista,cateVista,
                    verChango:req.session.productocomprado,total:req.session.total,
                    progroupFrag,progroupTam,progroupLitr}) 

                })
            })
        })
            
    }else{
        Producto.find({eliminado: { $ne: true },categoria:cateid},
            ).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
           
                .exec((err,productos)=>{
                        let cateTitle=productos[0].categoria.name
                        let cateid=productos[0].categoria.id
                    let productosVista=[]
                    for(let i=0;i<productos.length;i++){
                        let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                        let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                        let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                            produ={
                                id:productos[i].id,
                                name:productos[i].name,
                                description:productos[i].description,
                                code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                                price:productos[i].price,
                                categoria:productos[i].categoria!=null?productos[i].categoria.name:"",
                                categoriaid:productos[i].categoria!=null?productos[i].categoria.id:"",
                                img:productos[i].img
             
                            }
                        productosVista.push(produ)
                    }
                    Categoria.find({eliminado:{ $ne: true }})
                
                .exec((err,cat)=>{
                let cateVista=[]
               for(let i=0;i<cat.length;i++){
                   cate={
                       id:cat[i].id,
                       name:cat[i].name,
                       
                    //    code:producto[i].code,
                    //    price:producto[i].price,
                       img:cat[i].img
    
                   }
                   cateVista.push(cate)
                  
                    
                }
                Producto.find({categoria:cateid},
                    ).populate('fragancia').populate('tamano').populate('presentacion')
                        .exec((err,productos)=>{
                            let progroupFrag=null
                            let progroupTam=null
                            let progroupLitr=null
                          
                            if(productos[0].checkFragancia){
                                progroupFrag = productos.reduce((r, a) => {
                                   if(a.fragancia!=null){
                                   r[a.fragancia.name] = [...r[a.fragancia.name] || [], a];
                                   }
                                   return r;
                               }, {});
                           }
                           if(productos[0].checkTamano){
                               progroupTam = productos.reduce((r, a) => {
                                   if(a.tamano!=null){
                                  r[a.tamano.name] = [...r[a.tamano.name] || [], a];
                                   }
                                  return r;
                              }, {});
                          }
                          if(productos[0].checkPresentacion){
                           progroupLitr = productos.reduce((r, a) => {
                               if(a.presentacion!=null){
                              r[a.presentacion.name] = [...r[a.presentacion.name] || [], a];
                               }
                              return r;
                          }, {});
                      }
                    res.render('frontEnd/articulos',{cateid,titulo:cateTitle,productosVista,cateVista,
                        verChango:req.session.productocomprado,total:req.session.total,
                        progroupFrag,progroupTam,progroupLitr}) 

                })
            })
        })
    }
}
function getproductoById(req,res){
    var id=req.params.id
    if(!req.session.productocomprado){
        req.session.productocomprado=[]
    }
    let total=0
        for(let i=0;i<req.session.productocomprado.length;i++){
            total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
        }
        req.session.total=total.toFixed(2)
    Producto.findById(id,
    ).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
   
        .exec((err,producto)=>{
           
           let codfrag=producto.fragancia!=null?producto.fragancia.code:''
           let codtam=producto.tamano!=null?producto.tamano.code:''
           let codpres=producto.presentacion!=null?producto.presentacion.code:''
              let produ={
                   id:producto.id,
                   name:producto.name,
                   description:producto.description,
                   code:(producto.code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                   price:producto.price,
                   categoria:producto.categoria!=null?producto.categoria.name:"",
                   categoriaid:producto.categoria!=null?producto.categoria.id:"",
                   presentacion:producto.presentacion,
                   fragancia:producto.fragancia,
                   tamano:producto.tamano,
                   img:producto.img

               }
               Producto.find({categoria:producto.categoria.id},
                ).populate('fragancia').populate('tamano').populate('presentacion')
                    .exec((err,productos)=>{
                        let progroupFrag=null
                        let progroupTam=null
                        let progroupLitr=null
                      
                        if(productos[0].checkFragancia){
                             progroupFrag = productos.reduce((r, a) => {
            
                                r[a.fragancia.name] = [...r[a.fragancia.name] || [], a];
                                return r;
                            }, {});
                        }
                        if(productos[0].checkTamano){
                            progroupTam = productos.reduce((r, a) => {
           
                               r[a.tamano.name] = [...r[a.tamano.name] || [], a];
                               return r;
                           }, {});
                       }
                       if(productos[0].checkPresentacion){
                        progroupLitr = productos.reduce((r, a) => {
       
                           r[a.presentacion.name] = [...r[a.presentacion.name] || [], a];
                           return r;
                       }, {});
                   }
                   Categoria.find({eliminado:{ $ne: true }})
                
                   .exec((err,cat)=>{
                   let cateVista=[]
                  for(let i=0;i<cat.length;i++){
                      cate={
                          id:cat[i].id,
                          name:cat[i].name,
                          
                       //    code:producto[i].code,
                       //    price:producto[i].price,
                          img:cat[i].img
       
                      }
                      cateVista.push(cate)
                     
                       
                   }     


            return res.render('frontEnd/articuloDetalle',{produ,progroupFrag,progroupTam,progroupLitr,cateVista,
                verChango:req.session.productocomprado,total:req.session.total})  
            })
        })
    })
}

function getproductosPuntera(req,res){
    Producto.find({eliminado: { $ne: true },estaEnPuntera:"true"},
        ).populate('categoria').populate('fragancia').populate('marca')
       
            .exec((err,producto)=>{
                
                let productosVista=[]
               for(let i=0;i<producto.length;i++){
                   produ={
                       id:producto[i].id,
                       name:producto[i].name,
                       description:producto[i].description,
                       code:producto[i].code,
                       price:producto[i].price,
                       fragancia:producto[i].fragancia!=null?producto[i].fragancia.name:"",
                       categoria:producto[i].categoria!=null?producto[i].categoria.name:"",
                       marca:producto[i].marca!=null?producto[i].marca.name:"",
                       img:producto[i].img
    
                   }
                   productosVista.push(produ)
               }
               let productoscomprados=[]
               let total=0
           if(req.session.productocomprado){
            productoscomprados=req.session.productocomprado
            for(let i=0;i<req.session.productocomprado.length;i++){
                total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
                }
           }
          
            
               res.render('frontEnd/puntera',{productosVista,productoscomprados,total:total.toFixed(2)})  
            })
}

function llenarCarroCompra(req,res){
    let idproducto=req.params.id
    
    if(!req.session.productocomprado){
        req.session.productocomprado=[]
    }
    var items= req.session.productocomprado
  
    for(var i=0;i<items.length;i++){
         if(items[i].id==idproducto){
             req.session.productocomprado[i].cantidad++
             req.session.productocomprado[i].cantidadXproducto=(req.session.productocomprado[i].cantidad*req.session.productocomprado[i].precio).toFixed(2)
             let total=0
             for(let i=0;i<req.session.productocomprado.length;i++){
                 total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
             }
             req.session.total=total.toFixed(2)
             return res.redirect('/nuestrosArticulos/1')
            }
    }
    Producto.findById(idproducto,function(err,producto){
        articulo={
            precio:producto.price,
            descripcion:producto.name,
            id:producto._id,
            img:producto.img,
            cantidad:1,
            cantidadXproducto:producto.price
        }
        
        
        req.session.productocomprado.push(articulo)
        let total=0
        for(let i=0;i<req.session.productocomprado.length;i++){
            total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
        }
        req.session.total=total.toFixed(2)
        return res.redirect('/nuestrosArticulos/1')
    })
}
function eliminarItem(req,res){
    let iditem=req.params.id
    var splitPath=req.headers.referer.split('/')
    console.log('path',splitPath)
       var items= req.session.productocomprado
  
   for(var i=0;i<items.length;i++){
        if(items[i].id==iditem){
            req.session.productocomprado.splice(i,1)
        }
   }
   let total=0
   for(let i=0;i<req.session.productocomprado.length;i++){
       total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
   }
   
   req.session.total=total.toFixed(2)
   return res.redirect('/nuestrosArticulos/1')
   
}
function eliminarItemCarro(req,res){
    let iditem=req.params.id
   
       var items= req.session.productocomprado
  
   for(var i=0;i<items.length;i++){
        if(items[i].id==iditem){
            req.session.productocomprado.splice(i,1)
        }
   }
   
   
   return res.redirect('/carroCompra')
   
}

function verCarroCompra(req,res){
    let verChango=[]
        if(req.session.productocomprado){
            verChango= req.session.productocomprado
        }
        let total=0
        for(let i=0;i<req.session.productocomprado.length;i++){
            total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
        }
   
        req.session.total=total
        if(req.session.total==0){
            Categoria.find({eliminado:{ $ne: true }})
            .exec((err,cat)=>{
            let cateVista=[]
           for(let i=0;i<cat.length;i++){
               cate={
                   id:cat[i].id,
                   name:cat[i].name,
                   
                //    code:producto[i].code,
                //    price:producto[i].price,
                   img:cat[i].img

               }
               cateVista.push(cate)
             
            }
            return res.render('frontEnd/carro-compra',{mensaje:"El carro de compras esta vacio",cateVista,total,verChango})
            })
          
        }else{
            Categoria.find({eliminado:{ $ne: true }})
            .exec((err,cat)=>{
            let cateVista=[]
            for(let i=0;i<cat.length;i++){
               cate={
                   id:cat[i].id,
                   name:cat[i].name,
                   
                //    code:producto[i].code,
                //    price:producto[i].price,
                   img:cat[i].img

               }
               cateVista.push(cate)
              
            }
            return res.render('frontEnd/carroCompra',{verChango,total,cateVista})
            })
        }
}
function agregarCantidad(req,res){
    var params=req.body;
  
    var items= req.session.productocomprado
  
    for(var i=0;i<items.length;i++){
         if(items[i].id==params.id){
             req.session.productocomprado[i].cantidad=params.cantidad
             req.session.productocomprado[i].cantidadXproducto=(params.cantidad*req.session.productocomprado[i].precio).toFixed(2)
         }
    }
   
    let total=0
    for(let i=0;i<req.session.productocomprado.length;i++){
        total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
    }
    return res.send({total:total.toFixed(2)})
}
async function enviarMail(req,res){
    var params=req.body
    var pedido=new Pedido()


    pedido.name='PedidoWeb'
    pedido.nombreCliente=params.nombre
    pedido.direccionCliente=params.direccion
    pedido.emailCliente=params.email
    pedido.telefonoCliente=params.telefono
    pedido.codigoPostal=params.codigoPostal
    pedido.totalCompra=req.session.total
    pedido.eliminado=false
    pedido.CreateAt=moment().unix();
    for(let i=0;i<req.session.productocomprado.length;i++){
        let pitem=new itemPedido()
        pitem.name=req.session.productocomprado[i].descripcion
        pitem.idProducto=req.session.productocomprado[i].id
        pitem.cantidad=req.session.productocomprado[i].cantidad
        pitem.eliminado=false
        pitem.CreateAt=moment().unix();
        pitem.save(function(err, item){
            if(err)console.log('itemsave',err)
               
        })
        pedido.items.push(pitem)
        
    }
    pedido.numeroRemito= numeroRemito.nroREmito().exec()
    pedido.estado=await Estado.findOne({codigo:1}).exec()
    pedido.save(function(err,ped){
        if(err)console.log('pedidosave',err)

        var contenido='<h1>Este es un pdf de prueba</h1>'
    
    var options = {
        "format": 'A4',
        "header": {
            "height": "60px"
        },
        "footer": {
            "height": "22mm"
        },
        "base": 'file://Users/midesweb/carpeta_base/pdf/'
       };
       let idped=ped.id
    pdf.create(contenido,options).toFile('pdf/'+idped+'.pdf', function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
          
            let body="<ul><li>"+params.nombre+"</li><li>"+params.direccion+"</li><li>"+params.email+"</li></ul>"
            envioMail.sendEmail("rafazira83@gmail.com",params.email,"Compra Realizada",body,idped+'.pdf')
            // envioMail.sendEmail("ziraldodiego@gmail.com","ziraldodiego@gmail.com","PdfClienteRecibido",body,idped+'.pdf')

            req.session.destroy()
            
        }
    });

    })
    return res.render('frontEnd/mensajeEmailEnviado')

    
  
}
function getProduct(req,res){
   
    let busqueda=req.body
    if(busqueda.cate && busqueda.fraga  && busqueda.prese){
        Producto.find({categoria:busqueda.cate,fragancia:busqueda.fraga,presentacion:busqueda.prese},
            function(error,productos){
                if(error){
                  
                   return res.send(error) 
                }
               
               let productovista=[]
               for(let i=0;i<productos.length;i++){
                    let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                    let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                    let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                produ={
                    id:productos[i].id,
                    name:productos[i].name,
                    price:productos[i].price,
                    code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                    description:productos[0].description,
                    img:productos[i].img
                }
                productovista.push(produ)
               return res.send(productovista)
            }
            }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
        }else if(busqueda.cate && busqueda.fraga  && busqueda.tama){
            Producto.find({categoria:busqueda.cate,fragancia:busqueda.fraga,tamano:busqueda.tama},
                function(error,productos){
                    if(error){
                      
                       return res.send(error) 
                    }
                   
                   let productovista=[]
                   for(let i=0;i<productos.length;i++){
                        let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                        let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                        let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                    produ={
                        id:productos[i].id,
                        name:productos[i].name,
                        price:productos[i].price,
                        code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                        description:productos[0].description,
                        img:productos[i].img
                    }
                    productovista.push(produ)
                   return res.send(productovista)
                }
                }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if(busqueda.cate && busqueda.prese ){
        Producto.find({categoria:busqueda.cate,presentacion:busqueda.prese},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
               for(let i=0;i<productos.length;i++){
                    let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                    let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                    let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                produ={
                    id:productos[i].id,
                    name:productos[i].name,
                    price:productos[i].price,
                    code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                    description:productos[0].description,
                    img:productos[i].img
                }
                productovista.push(produ)
               return res.send(productovista)
            }
            }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if(busqueda.cate && busqueda.tama ){
        Producto.find({categoria:busqueda.cate,tamano:busqueda.tama},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
                for(let i=0;i<productos.length;i++){
                     let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                     let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                     let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                 produ={
                     id:productos[i].id,
                     name:productos[i].name,
                     price:productos[i].price,
                     code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                     description:productos[0].description,
                     img:productos[i].img
                 }
                 productovista.push(produ)
                return res.send(productovista)
            }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if(busqueda.cate && busqueda.fraga ){
        Producto.find({categoria:busqueda.cate,fragancia:busqueda.fraga},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
                for(let i=0;i<productos.length;i++){
                     let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                     let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                     let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                 produ={
                     id:productos[i].id,
                     name:productos[i].name,
                     price:productos[i].price,
                     code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                     description:productos[0].description,
                     img:productos[i].img
                 }
                 productovista.push(produ)
                return res.send(productovista)
            }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if(busqueda.tamano && busqueda.fraga ){
        Producto.find({tamano:busqueda.tamano,fragancia:busqueda.fraga},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
                for(let i=0;i<productos.length;i++){
                     let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                     let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                     let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                 produ={
                     id:productos[i].id,
                     name:productos[i].name,
                     price:productos[i].price,
                     code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                     description:productos[0].description,
                     img:productos[i].img
                 }
                 productovista.push(produ)
                return res.send(productovista)
            }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if(busqueda.prese && busqueda.fraga ){
        Producto.find({presentacion:busqueda.prese,fragancia:busqueda.fraga},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
                for(let i=0;i<productos.length;i++){
                     let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                     let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                     let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                 produ={
                     id:productos[i].id,
                     name:productos[i].name,
                     price:productos[i].price,
                     code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                     description:productos[0].description,
                     img:productos[i].img
                 }
                 productovista.push(produ)
                return res.send(productovista)
            }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if(busqueda.tamano && busqueda.prese ){
        Producto.find({tamano:busqueda.tamano,presentacion:busqueda.presentacion},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
                for(let i=0;i<productos.length;i++){
                     let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                     let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                     let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                 produ={
                     id:productos[i].id,
                     name:productos[i].name,
                     price:productos[i].price,
                     code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                     description:productos[0].description,
                     img:productos[i].img
                 }
                 productovista.push(produ)
                return res.send(productovista)
            }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if( busqueda.fraga ){
        Producto.find({fragancia:busqueda.fraga},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
                for(let i=0;i<productos.length;i++){
                     let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                     let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                     let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                 produ={
                     id:productos[i].id,
                     name:productos[i].name,
                     price:productos[i].price,
                     code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                     description:productos[0].description,
                     img:productos[i].img
                 }
                 productovista.push(produ)
                return res.send(productovista)
            }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if( busqueda.prese ){
        Producto.find({presentacion:busqueda.prese},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
                for(let i=0;i<productos.length;i++){
                     let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                     let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                     let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                 produ={
                     id:productos[i].id,
                     name:productos[i].name,
                     price:productos[i].price,
                     code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                     description:productos[0].description,
                     img:productos[i].img
                 }
                 productovista.push(produ)
                return res.send(productovista)
            }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }else if( busqueda.tama ){
        Producto.find({tamano:busqueda.tama},
            function(error,productos){
                if(error){
                    console.log(error)
                   return res.send(error) 
                }
                let productovista=[]
                for(let i=0;i<productos.length;i++){
                     let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                     let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                     let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                 produ={
                     id:productos[i].id,
                     name:productos[i].name,
                     price:productos[i].price,
                     code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                     description:productos[0].description,
                     img:productos[i].img
                 }
                 productovista.push(produ)
                return res.send(productovista)
            }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    }
    

    }

    function buscarProductos(req,res){
        let params =req.body
        if(!req.session.productocomprado){
            req.session.productocomprado=[]
        }
        let total=0
            for(let i=0;i<req.session.productocomprado.length;i++){
                total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
            }
            req.session.total=total.toFixed(2)
        Producto.find({$or: [{name: new RegExp(params.busqueda,"i")},{descripcion: new RegExp(params.busqueda,"i")}],eliminado: { $ne: true }},function(error,productos){
            if(productos.length==0){
                Categoria.find({eliminado:{ $ne: true }})
                
                .exec((err,cat)=>{
                let cateVista=[]
               for(let i=0;i<cat.length;i++){
                   cate={
                       id:cat[i].id,
                       name:cat[i].name,
                       
                    //    code:producto[i].code,
                    //    price:producto[i].price,
                       img:cat[i].img
    
                   }
                   cateVista.push(cate)
                  
                }
        res.render('frontEnd/carro-compra',{mensaje:'No se encontraron resultados para esta busqueda',cateVista,
            verChango:req.session.productocomprado,total:req.session.total}) 
        })
            }else{
                let productosVista=[]
                    for(let i=0;i<productos.length;i++){
                        let codfrag=productos[i].fragancia!=null?productos[i].fragancia.code:''
                        let codtam=productos[i].tamano!=null?productos[i].tamano.code:''
                        let codpres=productos[i].presentacion!=null?productos[i].presentacion.code:''
                            produ={
                                id:productos[i].id,
                                name:productos[i].name,
                                description:productos[i].description,
                                code:(productos[i].code+codfrag+codtam+codpres).toString().padStart(10,"0"),
                                price:productos[i].price,
                                categoria:productos[i].categoria!=null?productos[i].categoria.name:"",
                                categoriaid:productos[i].categoria!=null?productos[i].categoria.id:"",
                                img:productos[i].img
             
                            }
                        productosVista.push(produ)
                    }
                    Categoria.find({eliminado:{ $ne: true }})
                
                    .exec((err,cat)=>{
                    let cateVista=[]
                   for(let i=0;i<cat.length;i++){
                       cate={
                           id:cat[i].id,
                           name:cat[i].name,
                           
                        //    code:producto[i].code,
                        //    price:producto[i].price,
                           img:cat[i].img
        
                       }
                       cateVista.push(cate)
                      
                    }
            res.render('frontEnd/articulos',{productosVista,cateVista,
                verChango:req.session.productocomprado,total:req.session.total}) 
            })
        }
        }).populate('categoria').populate('fragancia').populate('tamano').populate('presentacion')
    
    }
module.exports={
    
    getproductos,
 getproductosPuntera,
 llenarCarroCompra,
 verCarroCompra,
 eliminarItem,
 agregarCantidad,
 getproductoById,
 mainPage,
 eliminarItemCarro,
 enviarMail,
 contacto,
 mailContacto,
 getProduct,
 buscarProductos
}