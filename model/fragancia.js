var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var FraganciaShema= Schema({
    name:String,
    code:String,
    CreateAt:String,
    eliminado:Boolean
})



module.exports=mongoose.model('Fragancia',FraganciaShema)