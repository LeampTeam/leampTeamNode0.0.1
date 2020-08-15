
var Producto=require('../../model/producto')



function oferta(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
         
             Producto.find({estaEnOferta:'true',eliminado: { $ne: true }},function(err,productos){
                
                
                res.render('admin/oferta/oferta',{data,productos});
                
             })
            }
function guardarProductoOferta(req,res){

    let id=req.params.id
    // var splitPath=req.headers.referer.split('/')
    // console.log('path',splitPath)
    
   
        Producto.findByIdAndUpdate(id,{estaEnOferta:'true'},function(err,prod){
           
                var data={
                    name:req.session.nameuser,
                    id:req.session.iduser,
                    img:req.session.imguser,
                    email:req.session.email
                   }
                    res.render('admin/producto/produGrilla',{data});

        })
    
    
}

function sacarOferta(req,res){

    let id=req.params.id

   
        Producto.findByIdAndUpdate(id,{estaEnOferta:'false'},function(err,prod){
        
                res.redirect('/admin/oferta/oferta')
            
        })
}



module.exports={
    oferta,
    guardarProductoOferta,
    sacarOferta
}