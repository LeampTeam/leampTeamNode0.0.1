var Presentacion= require('../../model/presentacion');
var path = require('path');
var moment = require('moment')



function grilla(req,res){
    
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/presentacion/preseGrilla',{data});
     
}

function presentaciones(req,res){
    let search=req.query.search.value
    let start=parseInt(req.query.start)
    let length=parseInt(req.query.length)
    Presentacion.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name code')
    .exec((err,presentacion)=>{
        var tamfilt= presentacion.slice(start,(start+length))
           console.log(tamfilt)
        res.json({
            data:tamfilt,
            draw: req.draw,
            recordsTotal: presentacion.length,
            recordsFiltered: presentacion.length,
        })  
    })
}

function create(req,res){
  
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
     
         let presentacion=new Presentacion()
        res.render('admin/presentacion/preseCreate',{data,presentacion});
    
}

function createPost(req,res){
    let params=req.body;
    let presentacion =new Presentacion();
    if(params.name ){
        presentacion.name=params.name;
        presentacion.code=params.code;
        presentacion.CreateAt=moment().unix();
        presentacion.eliminado=false
        presentacion.save((err,userStored)=>{
            if(err) return res.render('admin/presentacion/create',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/admin/presentacion/grilla');
            }else{
                res.render('admin/presentacion/create',{message:'Error al guardar'})
            }
        })
    }else{
        tamano.name=params.name;
        tamano.code=params.code;
        categoria.CreateAt=moment().unix();
        res.render('admin/presentacion/create',{user,message:'Completa todos los campos'}
        )
    }
}

function edit(req,res){
    
    let idEdit=req.params.id
    
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
       Presentacion.findById(idEdit,function(err,presentacion){
                res.render('admin/presentacion/preseEdit',{data,presentacion});
            
     })
}

function editPost(req,res){
    let params=req.body

    Presentacion.findByIdAndUpdate(params.id, {name:params.name,code:params.code}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/presentacion/grilla')
    })
}

function borrarFragancias(req,res){
    console.log(req)
    let IdFragancias = req.params.id;
    
    Presentacion.findByIdAndUpdate(IdFragancias, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //
        return res.redirect('admin/presentacion/grilla')
     
    })
}


module.exports={
    grilla,
    presentaciones,
    create,
    createPost,
    edit,
    editPost,
    borrarFragancias

}