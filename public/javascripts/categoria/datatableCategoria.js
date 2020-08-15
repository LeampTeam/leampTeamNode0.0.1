$(document).ready(function() {
    var t=  $('.server-side').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/admin/categoria/categorias',
            
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "name" },
                  
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/admin/categoria/edit/'+row._id+' class="btn btn-primary"><i class="feather icon-edit-2"></i></a>'
                +'<button id="borrar" name='+row._id+' class="btn btn-danger"><i class="feather icon-trash-2"></i></a>'
                +'<button name="'+row._id+'" myimg="'+row.img+'" type="button"  class="btn btn-primary imagen"  data-toggle="popover" data-content="<img src=http://127.0.0.1:3000/admin/categoria/getImageFile/'+row.img +'/>" data-trigger="hover" data-html="true" data-original-title="Imagen del Producto" ><i class="feather icon-image"></i></button>'
            }
        }
        ],
        "columnDefs": [
           
            {
                "targets": 0 ,
                "visible": false,
                "searchable": false
            }
            
        ]
       
    } );

    $('[data-toggle="popover"]').popover();

    $('.server-side').on('mouseout',".imagen", function() {
      $(this).popover('hide');
    })
    $('.server-side').on('mouseenter',".imagen", function() {
      $(this).popover('show');
    })

    $('.server-side').on( "click","#borrar" ,function() {
        var id=$(this).attr('name')

    //Modal
    let modal = confirm('Desea borrar el usuario')
    if (modal == true) {
        $.get("http://localhost:3000/admin/categoria/borrarCategorias/"+id, function( data ) {
            window.location.reload()
           });
           alert ('Se elimino el usuario')
      } else {
            alert ('No se elimino el usuario')
      }

    });    
} );
$(".server-side").on( "click",".imagen" ,function() {
      
    console.log( $( this ).attr('name') );
    $('#productId').val($(  this ).attr('name'))
   $('#cargaImagen').modal('show')
        
    });
  Dropzone.options.uploadWidget = {
    paramName: 'file',
    maxFilesize: 2, // MB
    maxFiles: 1,
    dictDefaultMessage: 'Arrastre una imagen o haga click',
   
    acceptedFiles: 'image/*',
    init: function() {
      var _this = this
      this.on('success', function(file, resp){
        console.log(resp)
        imagen=resp
        $('#cargaImagen').modal('hide')
        _this.removeAllFiles();
        $('.server-side').DataTable().ajax.reload();
      });
      this.on('complete', function(file, resp){
        console.log('complete',file);
        console.log(resp);
      });
    }
    
  };