
$(document).ready(function() {
    var t=  $('.server-side').DataTable( {
        "processing": true,
        "serverSide": true,
      
        "ajax": '/admin/fragancia/fragancias'
            
        ,
        "columns": [
            
            { "data": "_id" },
            { "data": "name" },
            { "data": "code" },
                  
            {"render": function ( data, type, row ) {
                return '<a type="button" href=/admin/fragancia/edit/'+row._id+' class="btn btn-primary"><i class="feather icon-edit-2"></i></a>'
                +'<button id="borrar" name='+row._id+' class="btn btn-danger"><i class="feather icon-trash-2"></i></a>'
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

    $('.server-side').on( "click","#borrar" ,function() {
        var id=$(this).attr('name')

    //Modal
    let modal = confirm('Desea borrar el usuario')
    if (modal == true) {
        $.get("http://localhost:3000/admin/fragancia/borrarFragancias/"+id, function( data ) {
            window.location.reload()
           });
           alert ('Se elimino el usuario')
      } else {
            alert ('No se elimino el usuario')
      }

    });



} );