var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var PresentacionShema= Schema({
    name:String,
    code:String,
    CreateAt:String,
    eliminado:Boolean
})



module.exports=mongoose.model('Presentacion',PresentacionShema)