/* =================================  INVENTORY  ================================== */
$(document).ready(function(){
  $('.js-example-basic-single').select2();  


  /* ================================================= VIEW ALL DATA ===========================================================*/
  $.ajax({
      type        : "GET",
      url         : "/inv_mgt/inventory/getAll",
      contentType : "application/json",
      dataType  	: "json",
      success: function(response){

        $.each(response.data, function (i, inventory) {   
          $("#main_table").append(
            '<tr>'
              +'<td>' + (i+1) + '</td>'
              +'<td>' + inventory.name + '</td>'
              +'<td>' + inventory.detail + '</td>'
              +'<td>' + inventory.price + '</td>'
              +'<td>' + inventory.stock + '</td>'
              +'<td><img src="'+inventory.image+'" alt="image" height="35px"></td>'
              +'<td class="col-md-1">' +  
                 '<button id="requestButton" class="btn btn-success" value="' + inventory.code + '" '+
                    'data-toggle="modal" data-target="#requestModal" ><i class="icon fa fa-plus"></i> Request</button>'
              +'</td>' +
            '</tr>'
            ); 

        });

      },
      error: function(){
          alert("Error");
      }
  });

      

  /* ================================================= REQUEST BUTTON ===========================================================*/
  $(document).on("click", "#requestButton", function(){ 
      
      var id = $(this).val();
      var form = document.getElementById('requestForm');  
  
      var data = $.parseJSON(

	      $.ajax({
	          type          : "GET",
	          url           : "/inv_mgt/inventory/getById/" + id,
	          contentType   : "application/json",
	      	  dataType      : "json",
    		  async: false
	      }).responseText
	  );

	  var dataJson = JSON.parse(JSON.stringify(data.data), function (key, value) { 
     		var formInput = $('[name='+ key +']', form);  
     		formInput.val(value);   
    });
	
  });


  $(document).on("click", "#updateButtonForm", function(){ 
	  var id = $(this).val();  
	  var form = document.getElementById('updateForm'); 
	  var dataForm = ConvertFormToJSON(form);

	  alert(dataForm);
	  alert(JSON.stringify(dataForm));


	  $.ajax({
	      type       	: "PUT",
	      url     		: "/inv_mgt/inventory/updateById/" + id,
	      data       	: JSON.stringify(dataForm),
	      contentType   : "application/json",
		  dataType  	: "json",
	      success : function(response){ 
	      },
	      error : function(response){ 
	      }
	  }).responseText;
     
  });


  /* ================================================= DELETE DATA ===========================================================*/
  $(document).on("click", "#deleteButton", function(){
      var id = $(this).val(); 
  
      $.ajax({
          type      	: "DELETE",
          url       	: "/inv_mgt/inventory/deleteById/" + id,
          contentType   : "application/json",
	  	  dataType  	: "json",
          success : function(response){ 
              showAlert('success');
              location.reload(true);
          },
          error : function(response){
              showAlert('failed');
          }
      });
  });


  /* ======================================= CONVERT FORM =======================================================*/
  function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};
    
    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });
    
    return json;
  }



  /* ============================================== ALERT ========================================================*/
  function showAllert(code, message, description){
    if (code == 200) {
        $("#alert").append(
           '<div class="alert alert-success " id="alert-success">' + 
              '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
              '<h4><i class="icon fa fa-check"></i> '+ message +'</h4>'+ description +
            '</div>'    
        );
    }
    else{
        $("#alert").append(
           '<div class="alert alert-danger " id="alert-success">' + 
              '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
              '<h4><i class="icon fa fa-ban"></i> '+ message +'</h4>'+ description +
            '</div>'    
        );
    }
  }




});

/* ==============================  END OF INVENTORY  =============================== */