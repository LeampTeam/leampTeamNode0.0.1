var Categoria= require('../../model/categoria');
var path = require('path');
var moment = require('moment')
var Fragancia= require('../../model/fragancia');
var fs = require('fs');

function grilla(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/categoria/cateGrilla',{data});
    
}

function categorias(req,res){
    let search=req.query.search.value
    let start=parseInt(req.query.start)
    let length=parseInt(req.query.length)
    Categoria.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name img')
    .exec((err,categorias)=>{
        var catefilt= categorias.slice(start,(start+length))
        res.json({
            data:catefilt,
            draw: req.draw,
            recordsTotal: categorias.length,
            recordsFiltered: categorias.length,
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
       Fragancia.find({},function(error,fragancias){
         let categoria=new Categoria()
        res.render('admin/categoria/cateCreate',{data,categoria,fragancias});
       })
    
}

function createPost(req,res){
    let params=req.body;
    let categoria =new Categoria();
    if(params.name ){
        categoria.name=params.name;
        categoria.color=params.color;
        // categoria.fragancias=params.fragancias
           
        
        categoria.CreateAt=moment().unix();
        categoria.eliminado=false
        categoria.save((err,userStored)=>{
            if(err) return res.render('admin/categoria/register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/admin/categoria/grilla');
            }else{
                res.render('admin/categoria/cateCreate',{message:'Error al guardar'})
            }
        })
    }else{
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        res.render('admin/categoria/cateCreate',{user,message:'Completa todos los campos'}
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
       
            Categoria.findById(idEdit,function(err,categoria){
                Fragancia.find({},function(error,fragancias){
                res.render('admin/categoria/cateEdit',{data,categoria,fragancias});
            }).populate('fragancias')  
     })
}

function editPost(req,res){
    let params=req.body
    var cat={
    name:params.name,
    color:params.color,
    // fragancias:params.fragancias
   }
    Categoria.findByIdAndUpdate(params.id, cat, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/categoria/grilla')
    })
}

function borrarCategoria(req,res){
    console.log(req)
    let IdCategoria = req.params.id;
    
    Categoria.findByIdAndUpdate(IdCategoria, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //
        return res.redirect('/admin/categoria/grilla')
     
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
            Categoria.findById(productid,(err,pro)=>{
                if(pro.img!=null){
                    if(pro.img!='imagenotfound.png'){
                        fs.unlinkSync('./imagenes/categoria/'+pro.img)
                    }
                   
                }
               
            })
            Categoria.findByIdAndUpdate(productid, { img: file_name }, { new: true }, (err, productUpdated) => {
               
                if (err) return res.status(500).send({ message: 'Erro en la peticion' })

                if (!productUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })
                
                return res.status(200).send(file_name)
                
            })
        } else {
            removeFilesOfUploads(res, file_path, 'La extencion no es valida')

        }
    } else {
        return res.status(200).send({ message: 'No se han subido archivos' })
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.img;
    console.log(imageFile)
    var pathFile = './imagenes/categoria/' + imageFile

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile))
        } else {
            res.status(400).send({ message: 'El archivo no fue encotrado' })
        }
    })
}
function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}
module.exports={
    grilla,
    categorias,
    create,
    createPost,
    edit,
    editPost,
    borrarCategoria,
    getImageFile,
    uploadImage

}