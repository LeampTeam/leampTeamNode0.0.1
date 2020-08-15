var mongoose= require('mongoose');
var Schema =mongoose.Schema;

/* Declaracion de campos en la base de datos */
var ProducSchema=Schema({
   
    name:String,
    description:String,
    price:Number,
    priceMayor: Number,
    code:String,  
    stock:Number,
    crateAt:String,
    tamano: { type: Schema.Types.ObjectId, ref: 'Tamano' },
    presentacion: { type: Schema.Types.ObjectId, ref: 'Presentacion' },
    img:String,
    esFragancia:Boolean,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    fragancia: { type: Schema.Types.ObjectId, ref: 'Fragancia' },
    checkFragancia:Boolean,
    checkTamano:Boolean,
    checkPresentacion:Boolean,
    eliminado:Boolean,
    porcentaje:Number,
    estaEnPuntera:String,
    estaEnOferta:String

})



module.exports=mongoose.model('Producto',ProducSchema)