var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var TamanoShema= Schema({
    name:String,
    code:String,
    CreateAt:String,
    eliminado:Boolean
})
module.exports=mongoose.model('Tamano',TamanoShema)