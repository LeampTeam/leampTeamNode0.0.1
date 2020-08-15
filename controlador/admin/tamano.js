var Tamano= require('../../model/tamano');
var path = require('path');
var moment = require('moment')



function grilla(req,res){
    
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/tamano/tamanoGrilla',{data});
     
}

function tamanos(req,res){
    let search=req.query.search.value
    let start=parseInt(req.query.start)
    let length=parseInt(req.query.length)
    Tamano.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name code')
    .exec((err,tamanos)=>{
        var tamfilt= tamanos.slice(start,(start+length))
           console.log(tamfilt)
        res.json({
            data:tamfilt,
            draw: req.draw,
            recordsTotal: tamanos.length,
            recordsFiltered: tamanos.length,
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
     
         let tamano=new Tamano()
        res.render('admin/tamano/tamanoCreate',{data,tamano});
    
}

function createPost(req,res){
    let params=req.body;
    let tamano =new Tamano();
    if(params.name ){
        tamano.name=params.name;
        tamano.code=params.code;
        tamano.CreateAt=moment().unix();
        tamano.eliminado=false
        tamano.save((err,userStored)=>{
            if(err) return res.render('admin/tamano/create',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/admin/tamano/grilla');
            }else{
                res.render('admin/tamano/create',{message:'Error al guardar'})
            }
        })
    }else{
        tamano.name=params.name;
        tamano.code=params.code;
        categoria.CreateAt=moment().unix();
        res.render('admin/tamano/create',{user,message:'Completa todos los campos'}
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
            Tamano.findById(idEdit,function(err,tamano){
                res.render('admin/tamano/tamanoEdit',{data,tamano});
            
     })
}

function editPost(req,res){
    let params=req.body

    Tamano.findByIdAndUpdate(params.id, {name:params.name,code:params.code}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/tamano/grilla')
    })
}

function borrarFragancias(req,res){
    console.log(req)
    let IdFragancias = req.params.id;
    
    Tamano.findByIdAndUpdate(IdFragancias, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //
        return res.redirect('admin/tamano/grilla')
     
    })
}


module.exports={
    grilla,
    tamanos,
    create,
    createPost,
    edit,
    editPost,
    borrarFragancias

}