

$( document ).ready(function() {


  
  $('.select').change(function(){
    // $('#filtro').submit()
  let cate=$('#categoria').val()
  let fraga='';
  let tama='';
  let prese='';

    if( $("#fragancia")){
      fraga=$("#fragancia option:selected").val()
    }
    if( $("#tamano")){
      tama=$("#tamano option:selected").val()
    }
    if( $("#presentacion")){
      prese=$("#presentacion option:selected").val()
    }
    $('#listaProdu').empty()
  
    $.post( "/obtenerProducto/",{fraga,tama,prese,cate}, function( result ) {
      let html=''
      for(let i=0;i<result.length;i++){
         html+='<div class="product animate__animated animate__fadeIn">'
         +'<div class="product_img"><a href="/enviarCarroCompra/'+result[i].id+'"><img src="/admin/producto/getImageFile/'+result[i].img+'"></a>'
             +'<div class="product_action_box">'
                 +'<ul class="list_none pr_action_btn">'
                     +'<li class="add-to-cart"><a href="/enviarCarroCompra/'+result[i].id+'"><i class="icon-basket-loaded"></i> Agregar</a></li>'
                + '</ul>'
            +'</div>'
        + '</div>'
         +'<div class="product_info">'
             +'<h6 class="product_title"><a href="">'+result[i].name+' </a></h6>'
             +'<div class="product_price"><span class="price">$'+result[i].price+'</span></div>'
             +'<div class="rating_wrap">'
                 +'<div class="rating">'
                    +' <div class="product_rate" style="width:80%"></div>'
                + '</div><span class="rating_num">(21)</span></div>'
            + '<div class="pr_desc">'
                + '<p> '+result[i].description+'</p>'
            + '</div>'
            + '<ul class="product-meta">'
                + '<li>Codigo: <a class="code" href="#">'+result[i].code+'</a></li>'
                + '<li>Categoria: <a href="#">'+result[i].categoria+'</a></li>'
            + '</ul>'
            + '<div class="list_product_action_box">'
                 +'<ul class="list_none pr_action_btn">'
                    +' <li class="add-to-cart"><a href="/enviarCarroCompra/'+result[i].id+'"><i class="icon-basket-loaded"></i> Agregar</a></li>'
                +' </ul>'
             +'</div>'
        + '</div>'
     +'</div>'



      }
      $('#listaProdu').append(html)
            // console.log(result)
            // $('.product_title').html('')
            // $('.product_title').html(result.name)
            // $('.price').html('')
            // $('.price').html(result.price)
            // $('.code').html('')
            // $('.code').html(result.code)
            // $('.descrip').html('')
            // $('.descrip').html(result.description)
            // $('.product_img_box').empty()
            // $('.product_img_box').html('<img src="/admin/producto/getImageFile/'+result.img+'"  height="400" alt="product_img1">')
            // $('#buttonCompra').attr('name',result.id)
      });
    })

  //   $(document).on('touchend click','#buttonCompra',function(e){
  //     e.preventDefault();
  //     var id=$(this).attr('name')
  //     var cantidad=$('.qty').val()
  //     $.post( "/enviarCarroCompra/",{id,cantidad}, function( result ) {
  //       if(result=="ok"){
  //         window.location.href='/nuestrosArticulos/1'
  //       }
  //     });
  //   })
  // $(document).on('click','.fa-chevr{on-right',function(){
  //     $(this).removeClass('fa-chevron-right').addClass('fa-chevron-down')
  //  })

  //  $(document).on('click','.fa-chevron-down',function(){
  //    $(this).removeClass('fa-chevron-down').addClass('fa-chevron-right')
  //   })


    //   $('.bodyCarro').on('click','.fa-minus',function(e){
    //      var id=$(this)[0].id

    //     console.log(id)
    //     var cantidad=$('#cantidad'+id).val()
    //     console.log(cantidad)
    //     if(cantidad>=2){
    //         cantidad--
    //         $.post( "http://localhost:3000/agregarCantidad/",{id,cantidad}, function( result ) {
               
    //         $('#cantidad'+id).val(cantidad)
    //         console.log($('#precio'+id).html())
    //         var cantprecio=$('#precio'+id).html().split(" ")
    //          var cant= cantprecio[1]
    //          console.log(cant)
    //          var total=cantidad*cant
    //         $('#cantidadXproducto'+id).html(cantprecio[0]+" "+total.toFixed(2))
    //         $('.footerCarro').empty()
    //         let footercarro="<h4 style='float:left'>Subtotal</h4><h4 style='float:right'><b></b>$ "+result.total+"</h4>";

    //         $('.footerCarro').append(footercarro)
    //         });
              
           
    //     }
    //   })
    //   $('.bodyCarro').on('click','.fa-plus',function(e){
        
    //     var id=$(this)[0].id
    //     var cantidad=$('#cantidad'+id).val()
    //     if(cantidad>=1){
    //         cantidad++
    //         $.post( "http://localhost:3000/agregarCantidad/",{id,cantidad}, function( result ) {
               
    //             $('#cantidad'+id).val(cantidad)
    //            console.log($('#precio'+id).html())
    //            var cantprecio=$('#precio'+id).html().split(" ")
    //             var cant= cantprecio[1]
    //             console.log(cant)
    //             var total=cantidad*cant
    //            $('#cantidadXproducto'+id).html(cantprecio[0]+" "+total.toFixed(2))
    //            $('.footerCarro').empty()
    //            let footercarro="<h4 style='float:left'>Subtotal</h4><h4 style='float:right'><b></b>$ "+result.total+"</h4>";

    //            $('.footerCarro').append(footercarro)
    //            });
          
    //     }
    //   })

    //   $('.bodyCarro').on('click','.eliminarItem',function(e){
        
    //     var iditemCarro=$(this)[0].id
    //     console.log(iditemCarro)
    //     $.get( "http://localhost:3000/borrarItem/"+iditemCarro, function( result ) {
    //         $('.bodyCarro').empty()
    //         $('.footerCarro').empty()
    //         console.log(result)
    //         console.log(result.verEnChango)
    //         var chango=result.verEnChango
    //         var res="";
    //          for(var i =0;i<chango.length;i++){
    //             res+='<div class="itemCarro">'
    //                 + '<div class="row">'
    //                 + '<div class="col-4"><i id="'+chango[i].id+'" class="fas fa-minus"></i><input class="cantidad" id="cantidad'+chango[i].id+'" type="number" name="" min="1" max="100" value="'+chango[i].cantidad+'" /><i id="'+chango[i].id+'" class="fas fa-plus"></i></div>'
    //                 + '<div class="col-5">'
    //                 + '<h4 style="mergin-left:15px"> <b id="cantidadXproducto'+chango[i].id+'">$ '+chango[i].cantidadXproducto+' </b></h4>'
    //                 + '</div>'
    //                 + '<div class="col-3"><button class="btn btn-danger eliminarItem" id="'+chango[i].id+'" style="float:right"><i class="fas fa-times"> </i></button></div>'
    //                 + '</div>'
    //                 + '<div class="row fila">'
    //                 + '<div class="col-3"><img src="admin/producto/getImageFile/'+chango[i].img+'" alt="" width="50px" height="50px" /></div>'
    //                 + '<div class="col-6">'
    //                 + '<p style="margin-top: 12px;">'+chango[i].descripcion+'</p>'
    //                 + '</div>'
    //                 + '<div class="col-3">'
    //                 + '<p id="precio'+chango[i].id+'" style="margin-top: 12px;float:left">$ '+chango[i].precio+'</p>'
    //                 + '</div>'
    //                 + '</div>'
    //                 + '</div>'
    //                 + '<hr/>'
    //          }

    //          console.log(res)
    //             $('.bodyCarro').append(res)

    //             let footercarro="<h4 style='float:left'>Subtotal</h4><h4 style='float:right'><b></b>$ "+result.total+"</h4>";

    //             $('.footerCarro').append(footercarro)
    //        });
    //       })

    // $('.detalle').click(function(){

    //  var idart= $(this)[0].id
    //   $.get( "http://localhost:3000/detalleProducto/"+idart, function( result ) {

    //     $('.modal-body').empty()

       
    //     var res="";
        
    //         // res+='<div class="card" style="width: 25rem;">'
    //         // +'<img src="admin/producto/getImageFile/'+result.img+'"  alt="...">'
    //         // +'<div class="card-body">'
    //         // +'<h3 class="card-title">'+result.name+'</h3>'
    //         // +'<p class="card-text">'+result.description+'</p>'
    //         // +'<button id='+result.id+' onclick="dropclick(event)" class="btn btn-primary">Añadir al Carro</button>'
    //         // +'<h4 style="float:right"><b>$ '+result.price+'</b></h4>'
    //         // +'</div>'
    //         // +'</div>'

    //         res+='<div class="card mb-3" >'
    //         +'<div class="row no-gutters">'
    //           +'<div class="col-md-4">'
    //            + '<img src="admin/producto/getImageFile/'+result.img+'"height=300 width=300 class="card-img" alt="...">'
    //          + '</div>'
    //           +'<div class="col-md-8">'
    //             +'<div class="card-body">'
    //               +'<h3 class="card-title">'+result.name+'</h3>'
    //              + '<p class="card-text">'+result.description+'</p>'
    //              +'<button id='+result.id+' onclick="dropclick(event)" class="btn btn-info btnModal">Añadir al Carro</button>'
    //              +'<h4 style="float:right"><b>$ '+result.price+'</b></h4>'
    //            + '</div>'
    //          + '</div>'
    //        + '</div>'
    //      + '</div>'

    //      console.log(res)
    //         $('.modal-body').append(res)
    //    });
    // })

    // $('.modal-body').on('click','.btnModal',function(){
    //   $('#exampleModal').modal('hide')
    // })

})