var Pedido= require('../model/pedido');

exports.nroREmito=async function(){
    let numero=0

   await Pedido.find({},function(err,data){
        if(data.length>0){
            let ultimoElemento= data.slice(-1)
            let ultimoNumero=ultimoElemento[0].numeroRemito
              numero= ultimoNumero++
              return numero;
        }else{
            return numero
        }
      
    })


}