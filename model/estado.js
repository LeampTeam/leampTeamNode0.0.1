var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var EstadoShema= Schema({
    name:String,
    codigo:Number,
    CreateAt:String,
    eliminado:Boolean
})



module.exports=mongoose.model('Estado',EstadoShema)