var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var SugerenciaShema= Schema({
    name:String,
   email:String,
   phone:String,
   subject:String,
   message:String,
   

    CreateAt:String,
    
})



module.exports=mongoose.model('Sugerencia',SugerenciaShema)