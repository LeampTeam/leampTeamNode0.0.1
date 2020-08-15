$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/admin/pedido/pedidos',
            
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "estado.codigo" },
            { "data": "numeroRemito" },
            { "data": "nombreCliente" },
            { "data": "emailCliente" },
            {"render": function ( data, type, row ) {
                var date = new Date(row.CreateAt * 1000);     
                return date.toLocaleDateString()
                }
            },
            { "data": "totalCompra" },
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/admin/pedido/pedidoDetalle/'+row._id+'  data-toggle="tooltip" data-placement="top" title="Ver Detalle" class="btn btn-light"><i class="far fa-eye"></i></a>'
               
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

    $("#example").on( "click","#borrar" ,function() {
        var id=$(this).attr('name')

    //Modal
    let modal = confirm('Desea borrar la marca')
    if (modal == true) {
        $.get("http://localhost:3000/admin/estado/borrarEstados/"+id, function( data ) {
            window.location.reload()
           });
           alert ('Se elimino la marca')
      } else {
            alert ('No se elimino la marca')
      }

    });





} );