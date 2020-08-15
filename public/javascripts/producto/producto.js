$( document ).ready(function() {
   
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    $(".select2").select2({
        // the following code is used to disable x-scrollbar when click in select input and
        // take 100% width in responsive also
        dropdownAutoWidth: true,
        width: '100%'
      });
    var Font = Quill.import("formats/font");
    Font.whitelist = ["sofia", "slabo", "roboto", "inconsolata", "ubuntu"];
    Quill.register(Font, true);
   
      
     
      var snowEditor = new Quill("#snow-container .editor", {
        bounds: "#snow-container .editor",
        modules: {
          formula: true,
          syntax: true,
          toolbar: "#snow-container .quill-toolbar"
        },
        theme: "snow"
      });
      
      var i = 0;
    if (Array.prototype.forEach) {

        var elems = $('.switchery');
        $.each( elems, function( key, value ) {
            var $size="", $color="",$sizeClass="", $colorCode="";
            $size = $(this).data('size');
            var $sizes ={
                'lg' : "large",
                'sm' : "small",
                'xs' : "xsmall"
            };
            if($(this).data('size')!== undefined){
                $sizeClass = "switchery switchery-"+$sizes[$size];
            }
            else{
                $sizeClass = "switchery";
            }

            $color = $(this).data('color');
            var $colors ={
                'primary' : "#967ADC",
                'success' : "#37BC9B",
                'danger' : "#DA4453",
                'warning' : "#F6BB42",
                'info' : "#3BAFDA"
            };
            if($color !== undefined){
                $colorCode = $colors[$color];
            }
            else{
                $colorCode = "#37BC9B";
            }

            var switchery = new Switchery($(this)[0], { className: $sizeClass, color: $colorCode });
        });
    } else {
        var elems1 = document.querySelectorAll('.switchery');

        for (i = 0; i < elems1.length; i++) {
            var $size = elems1[i].data('size');
            var $color = elems1[i].data('color');
            var switchery = new Switchery(elems1[i], { color: '#37BC9B' });
        }
    }
    
      

      $( "#switchFragancia" ).change(function() {
        let val1= $(this).is(':checked')
        console.log(val1)
        if(val1){
            $("#selectFragancia").select2().next().show()
        }else{
            $("#selectFragancia").select2().next().hide()
        }
      });

      let val2= $("#switchFragancia").is(':checked')
      console.log(val2)
      if(val2){
          $("#selectFragancia").select2().next().show()
      }else{
          $("#selectFragancia").select2().next().hide()
      }

      $( "#switchTamano" ).change(function() {
        let val3= $(this).is(':checked')
        console.log(val3)
        if(val3){
            $("#selectTamano").select2().next().show()
        }else{
            $("#selectTamano").select2().next().hide()
        }
      });

      let val4= $("#switchTamano").is(':checked')
      console.log(val4)
      if(val4){
          $("#selectTamano").select2().next().show()
      }else{
          $("#selectTamano").select2().next().hide()
      }
      $( "#switchPresentacion" ).change(function() {
        let val5= $(this).is(':checked')
        console.log(val5)
        if(val5){
            $("#selectPresentacion").select2().next().show()
        }else{
            $("#selectPresentacion").select2().next().hide()
        }
      });

      let val6= $("#switchPresentacion").is(':checked')
      console.log(val6)
      if(val6){
          $("#selectPresentacion").select2().next().show()
      }else{
          $("#selectPresentacion").select2().next().hide()
      }


     
    //   $("#formProdu").on("submit",function(){
         
    //     $("#editorHidden").val($('.ql-editor').html());
    //     })
    //     $('.ql-editor').html($("#editorHidden").val()) 

    
});