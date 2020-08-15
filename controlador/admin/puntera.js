var Puntera=require('../../model/puntera')
var Producto=require('../../model/producto')



function puntera(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
         
             Producto.find({estaEnPuntera:'true',eliminado: { $ne: true }},function(err,productos){
                
                
                res.render('admin/puntera/puntera',{data,productos});
                
             })
            }
function guardarProductoPuntera(req,res){

    let id=req.params.id
    // var splitPath=req.headers.referer.split('/')
    // console.log('path',splitPath)
    
   
        Producto.findByIdAndUpdate(id,{estaEnPuntera:'true'},function(err,prod){
           
                var data={
                    name:req.session.nameuser,
                    id:req.session.iduser,
                    img:req.session.imguser,
                    email:req.session.email
                   }
                    res.render('admin/producto/produGrilla',{data});

        })
    
    
}

function sacarPuntera(req,res){

    let id=req.params.id

   
        Producto.findByIdAndUpdate(id,{estaEnPuntera:'false'},function(err,prod){
        
                res.redirect('/admin/puntera/puntera')
            
        })
}



module.exports={
    puntera,
    guardarProductoPuntera,
    sacarPuntera
}