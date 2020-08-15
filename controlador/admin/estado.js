var Estado= require('../../model/estado');
var path = require('path');
var moment = require('moment')



function grilla(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/estado/estadoGrilla',{data});
   
}

function estados(req,res){
    let search=req.query.search.value
    Estado.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name codigo ')
    .exec((err,estados)=>{
        res.json({
            data:estados,
            draw: req.draw,
            recordsTotal: estados.length,
            recordsFiltered: estados.length,
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
         let estado=new Estado()
        res.render('admin/estado/estadoCreate',{data,estado});
    
}

function createPost(req,res){
    let params=req.body;
    let estado =new Estado();
    if(params.name ){
        estado.name=params.name;
        estado.codigo=params.codigo;
        estado.CreateAt=moment().unix();
        estado.eliminado=false
        estado.save((err,userStored)=>{
            if(err) return res.render('admin/marca/register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/admin/estado/grilla');
            }else{
                res.render('admin/estado/estadoCreate',{message:'Error al guardar'})
            }
        })
    }else{
        estado.name=params.name;
        estado.CreateAt=moment().unix();
        res.render('admin/estado/estadoCreate',{estado,message:'Completa todos los campos'}
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
   
            Estado.findById(idEdit,function(err,estado){
                res.render('admin/estado/estadoEdit',{data,estado});
           
     })
}

function editPost(req,res){
    let params=req.body

    Estado.findByIdAndUpdate(params.id, {name:params.name, codigo:params.codigo}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/estado/grilla')
    })
}

function borrarEstado(req,res){
    console.log(req)
    let IdMarcas = req.params.id;
    
    Estado.findByIdAndUpdate(IdMarcas, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //Aqui vamos a poner la ruta desde donde queremos obtener los datos
        return res.redirect('/admin/estado/grilla')
     
    })
}


module.exports={
    grilla,
    estados,
    create,
    createPost,
    edit,
    editPost,
    borrarEstado

}