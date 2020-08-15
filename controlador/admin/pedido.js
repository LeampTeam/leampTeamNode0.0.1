var Pedido= require('../../model/pedido');
var path = require('path');
var moment = require('moment')

function grilla(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email,
        
       }
        res.render('admin/pedido/pedidoGrilla',{data});
    
}
function pedidos(req,res){
    let search=req.query.search.value
    Pedido.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id nombreCliente emailCliente totalCompra CreateAt numeroRemito')
    .populate('estado')
    .exec((err,pedidos)=>{
        res.json({
            data:pedidos,
            draw: req.draw,
            recordsTotal: pedidos.length,
            recordsFiltered: pedidos.length,
        })  
    })
}
function getpedidoById(req,res){
    var id=req.params.id
    Pedido.findById(id,
    ).populate('ItemPedido')
   
        .exec((err,pedidos)=>{
      
          
           return res.render('admin/pedido/pedidoDetalle',pedidos)  
        })
}



module.exports={
    grilla,
    pedidos,
    getpedidoById
   

}