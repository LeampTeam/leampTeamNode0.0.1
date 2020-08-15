$(document).ready(function() {
    var t=  $('#example').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": '/admin/estado/estados',
            
        },
        "columns": [
            
            { "data": "_id" },
            { "data": "name" },
            { "data": "codigo" },
                  
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/admin/estado/edit/'+row._id+' class="btn btn-light"><i class="fas fa-pencil-alt"></i></a>'
                +'<button id="borrar" name='+row._id+' class="btn btn-light"><i class="fas fa-trash"></i></a>'
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
        $.get("/admin/estado/borrarEstados/"+id, function( data ) {
            window.location.reload()
           });
           alert ('Se elimino la marca')
      } else {
            alert ('No se elimino la marca')
      }

    });





} );