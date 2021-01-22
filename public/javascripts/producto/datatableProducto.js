$(document).ready(function () {

  var t = $('.server-side').DataTable({
    "processing": true,
    "serverSide": true,

    "ajax": {
      "url": '/admin/producto/productos',

    },
    "columns": [

      {
        "data": "_id"
      },
      {
        "data": "code"
      },
      {
        "data": "categoria.name"
      },

      {
        "data": "price"
      },
      {
        "data": "stock"
      },

      {
        "render": function (data, type, row) {
          console.log(row);
          if (row.estaEnPuntera == 'true' && row.estaEnOferta == 'true') {
            return '<a type="button" href=/admin/producto/edit/' + row._id + ' data-toggle="tooltip" data-placement="top" title="editar" class="btn btn-info"><i class="feather icon-edit-2"></i></a>' +
              '<button id="borrar" name=' + row._id + ' data-toggle="tooltip" data-placement="top" title="eliminar" class="btn btn-danger"><i class="feather icon-trash-2"></i></button>' +
              '<button name="' + row._id + '" myimg="' + row.img + '" type="button"  class="btn btn-primary imagen"  data-toggle="popover" data-content="<img src=http://127.0.0.1:3000/admin/producto/getImageFile/' + row.img + '/>" data-trigger="hover" data-html="true" data-original-title="Imagen del Producto" ><i class="feather icon-image"></i></button>' +
              '<a name="' + row._id + '"  type="button" data-toggle="tooltip"  title="esta en puntera" data-placement="top" class="btn btn-success disabled" href="/puntera/guardarProductoPuntera/' + row._id + '"><i class="feather icon-external-link"></i></a>' +
              '<a name="' + row._id + '"  type="button" data-toggle="tooltip"  title="esta en oferta" data-placement="top" class="btn btn-warning disabled" href="/oferta/guardarProductoOferta/' + row._id + '"><i class="feather icon-upload"></i></a>'
          } else if (row.estaEnPuntera == 'true') {
            return '<a type="button" href=/admin/producto/edit/' + row._id + ' data-toggle="tooltip" data-placement="top" title="editar"  class="btn btn-info"><i class="feather icon-edit-2"></i></a>' +
              '<button id="borrar" name=' + row._id + ' data-toggle="tooltip" data-placement="top" title="eliminar" class="btn btn-danger"><i class="feather icon-trash-2"></i></button>' +
              '<button name="' + row._id + '" myimg="' + row.img + '" type="button" class="btn btn-primary imagen"  data-toggle="popover" data-content="<img src=http://127.0.0.1:3000/admin/producto/getImageFile/' + row.img + '/>" data-trigger="hover" data-html="true" data-original-title="Imagen del Producto" ><i class="feather icon-image"></i></button>' +
              '<a name="' + row._id + '" type="button" data-toggle="tooltip" title="poner en puntera" data-placement="top" class="btn btn-success disabled" href="/admin/puntera/guardarProductoPuntera/' + row._id + '"><i class="feather icon-external-link"></i></a>' +
              '<a name="' + row._id + '" type="button" data-toggle="tooltip" title="poner en oferta " data-placement="top" class="btn btn-warning" href="/admin/oferta/guardarProductoOferta/' + row._id + '"><i class="feather icon-upload"></i></a>'
          } else if (row.estaEnOferta == 'true') {
            return '<a type="button" href=/admin/producto/edit/' + row._id + ' data-toggle="tooltip" data-placement="top" title="editar"  class="btn btn-info"><i class="feather icon-edit-2"></i></a>' +
              '<button id="borrar" name=' + row._id + ' data-toggle="tooltip" data-placement="top" title="eliminar" class="btn btn-danger"><i class="feather icon-trash-2"></i></button>' +
              '<button name="' + row._id + '" myimg="' + row.img + '" type="button" class="btn btn-primary imagen"  data-toggle="popover" data-content="<img src=http://127.0.0.1:3000/admin/producto/getImageFile/' + row.img + '/>" data-trigger="hover" data-html="true" data-original-title="Imagen del Producto" ><i class="feather icon-image"></i></button>' +
              '<a name="' + row._id + '" type="button" data-toggle="tooltip" title="poner en puntera" data-placement="top" class="btn btn-success " href="/admin/puntera/guardarProductoPuntera/' + row._id + '"><i class="feather icon-external-link"></i></a>' +
              '<a name="' + row._id + '" type="button" data-toggle="tooltip" title="poner en oferta " data-placement="top" class="btn btn-warning disabled" href="/admin/oferta/guardarProductoOferta/' + row._id + '"><i class="feather icon-upload"></i></a>'
          } else {
            return '<a type="button" href=/admin/producto/edit/' + row._id + ' data-toggle="tooltip" data-placement="top" title="editar"  class="btn btn-info"><i class="feather icon-edit-2"></i></a>' +
              '<button id="borrar" name=' + row._id + ' data-toggle="tooltip" data-placement="top" title="eliminar" class="btn btn-danger"><i class="feather icon-trash-2"></i></button>' +
              '<button name="' + row._id + '" myimg="' + row.img + '" type="button" class="btn btn-primary imagen"  data-toggle="popover" data-content="<img src=http://127.0.0.1:3000/admin/producto/getImageFile/' + row.img + '/>" data-trigger="hover" data-html="true" data-original-title="Imagen del Producto" ><i class="feather icon-image"></i></button>' +
              '<a name="' + row._id + '" type="button" data-toggle="tooltip" title="poner en puntera" data-placement="top" class="btn btn-success " href="/admin/puntera/guardarProductoPuntera/' + row._id + '"><i class="feather icon-external-link"></i></a>' +
              '<a name="' + row._id + '" type="button" data-toggle="tooltip" title="poner en oferta " data-placement="top" class="btn btn-warning" href="/admin/oferta/guardarProductoOferta/' + row._id + '"><i class="feather icon-upload"></i></a>'
          }



        }

      }
    ],
    "columnDefs": [

      {
        "targets": 0,
        "visible": false,
        "searchable": false
      },

    ]

  });


  $('[data-toggle="popover"]').popover();

  $('.server-side').on('mouseout', ".imagen", function () {
    $(this).popover('hide');
  })
  $('.server-side').on('mouseenter', ".imagen", function () {
    $(this).popover('show');
  })


  $(".server-side").on("click", "#borrar", function () {
    var id = $(this).attr('name')

    alert('borrar')


    $.get("/admin/producto/delete/" + id, function (data) {
      window.location.reload()
    });
  });

});


$(".server-side").on("click", ".imagen", function () {

  console.log($(this).attr('name'));
  $('#productId').val($(this).attr('name'))
  $('#cargaImagen').modal('show')

});
Dropzone.options.uploadWidget = {
  paramName: 'file',
  maxFilesize: 2, // MB
  maxFiles: 1,
  dictDefaultMessage: 'Arrastre una imagen o haga click',

  acceptedFiles: 'image/*',
  init: function () {
    var _this = this
    this.on('success', function (file, resp) {
      console.log(resp)
      imagen = resp
      $('#cargaImagen').modal('hide')
      _this.removeAllFiles();
      $('.server-side').DataTable().ajax.reload();
    });
    this.on('complete', function (file, resp) {
      console.log('complete', file);
      console.log(resp);
    });
  }

};

$('#listaDePrecios').click(function (e) { 
  e.preventDefault();
  //  $.get("/admin/producto/delete/" , function (data) {
  //    window.location.reload()
  //  });
  $.ajax({
    type: "get",
    url: "/admin/producto/crearListaDePrecios",
    success: function (response) {
  
    }
  });
});