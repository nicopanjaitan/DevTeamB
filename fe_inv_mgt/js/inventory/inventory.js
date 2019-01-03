/* =================================  INVENTORY  ================================== */
$(document).ready(function(){
  $('.js-example-basic-single').select2();  



  /* ================================================= VIEW ALL DATA ===========================================================*/
  var inv_data = '';

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
              +'<td>' + inventory.price + '</td>'
              +'<td><div id="stockForm"> <button class="btn" id="stockButton" value="' + inventory.code + '"><i class="icon fa fa-edit" ></i></button>&emsp;' + inventory.stock + ' </div></td>'
              +'<td>' + inventory.image + '</td>'
              +'<td class="col-md-1">' +  
                '<div class="dropdown">'+
      		    		'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
      		    		'<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
      				      '<li><button id="viewButton" class="btn" value="' + inventory.code + '" '+
                      			'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
              			  '<li><button id="updateButton" class="btn" value="' + inventory.code + '" '+
                      			'data-toggle="modal" data-target="#updateModal" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                      	  '<li><button id="deleteButton" class="btn" value="' + inventory.code + '" >'+
                      	  		'<i class="icon fa fa-trash"></i> Delete</button></li>'+ 
      		    		'</ul>'+
      		  		'</div>'
              +'</td>' +
            '</tr>'
            ); 

        });

      },
      error: function(response){
          alert(response);
      }
  });

  /* ================================================= VIEW DATA BY ID ===========================================================*/
  $(document).on("click", "#search", function(){
     var id = $(this).val();
  	  $("#inventoryName").html('');
      $("#inventoryDetail").html('');
      $("#inventoryPrice").html('');
      $("#inventoryStock").html('');
 		alert('1');
      $.ajax({
	    type 			: "GET",
	    dataType 		: "json",
	    url 			: "/inv_mgt/inventory/getById/" + id,
	    success: function(response){
	    	alert('s');
	   		  
          $("#inventoryCode").append('<b>'+response.data.code+'</b>');
          $("#inventoryName").append(response.data.name);
          $("#inventoryDetail").append(response.data.detail);
          $("#inventoryPrice").append(response.data.price);
          $("#inventoryStock").append(response.data.stock);
	           
	    },
	    error: function(response){
          if(response.data == null){
          	alert(JSON.stringify(response) );
          }
          console.log(response );
	    }
      }); alert('1');
  });

   window.onerror = function (errorMsg, url, lineNumber) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
}   
  /* ================================================= SEARCH NEW DATA ===========================================================*/
  
    // $(document).on("click", "#search", function(){
    // 	alert(getTime());
    // });

  /* ================================================= ADD NEW DATA ===========================================================*/
  // $(document).on("click", "#addButtonForm", function(event){
  //    // event.preventDefault();
  //     ajaxSubmitForm();
  // });

  $("#addForm").submit(function(){
       ajaxSubmitForm();
  });
  
  function ajaxSubmitForm() {
 
    // Get form
    var form = $('#addForm')[0]; 
    var f_data = new FormData(form);
    
    f_data.append("code", null);
    //alert(f_data.get('image').getA);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/inv_mgt/inventory/create",
        data: f_data,
        dataType:"json",
 
        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 5000,
        success: function(response){
          console.log('1');
            $("#alert").html('');
            if(response.code == 200){
              jQuery("#addModal").modal("hide");
              showAllert(response.code, response.code + ' ' + response.message + "!", "Data has been added.");  
              setTimeout(function(){ location.reload(); }, 1000);
              console.log('2');
            } 
            else{
              $("#alert").html('');
              jQuery("#addModal").modal("hide");
              showAllert(response.code, response.code + ' ' + response.message + "!", "Something error.");  
              console.log('3');
           } 
           console.log('4');
           alert('ini');
        },
        error: function(response){
          console.log('5');
            
        }
    });

    alert('wq45');

  }

  // $(document).on("click", "#addButtonForm", function(){
	 //  var form = document.getElementById('addForm');  
	 //  var dataForm = ConvertFormToJSON(form);

  //     var formData = { 
  //       code: 'inv_' + getTime(),
  //       name: $("#name").val(),
  //       detail: $("#detail").val(),
  //       price: $("#price").val(),
  //       stock: $("#stock").val()
  //     };

  //     $.ajax({
  //         type      	: "POST",
  //         enctype: 'multipart/form-data',
  //         data      	: JSON.stringify(dataForm),
  //         contentType   : "application/json",
  //         url      		: "/inv_mgt/inventory/create",
  //         success: function(response){  
  //           alert("udh");
  //         },
  //         error: function(response){ 
  //           alert("gk");
  //         }
  //       }).responseText;

  // });

      
  /* ================================================= UPDATE STOCK INVENTORY ===========================================================*/
  function ShowUpdateStockForm(code){
  	$('#stockForm').html('');

    $("#stockForm").append(
       '<form action="" method="POST"  id="updateStockForm">'+
       		'<div class="input-group">'+
	        '<input type="number" class="form-control" id="stock" name="stock" min="1">'+
              '<div class="input-group-btn">'+
             	'<button class="btn btn-success" type="submit" id="stockButtonForm"><i class="icon fa fa-check"></i></button>'+
              '</div>'+
            '<div>'+
	    '</form> '    
    );
  }

  $(document).on("click", "#stockButton", function(){
  	  //call form to update the stock
	  ShowUpdateStockForm();
      
      var id = $(this).val();
      var form = document.getElementById('updateStockForm');
      var inputStock = $('[name=stock]', form); 
  
      $.ajax({
          type 			: "GET",
          url 			: "/inv_mgt/inventory/getById/" + id,
          contentType 	: "application/json",
      	  dataType  	: "json",
          success : function(response){
          	inputStock.val(response.data.stock); 
            $("#stockButtonForm").val(id); 
          },
          error : function(url){
            alert("Error");
          }
      });
     
  });

  $(document).on("click", "#stockButtonForm", function(e){ 
	  var id = $(this).val(); 

	  var formData = {
	    stock: $("#stock").val()
	  };

	  $.ajax({
	      type       	: "PUT",
	      url     		: "/inv_mgt/inventory/updateStockById/" + id,
	      data       	: JSON.stringify(formData),
	      contentType   : "application/json",
		    dataType  	: "json",
	      success : function(response){ 
	      },
	      error : function(response){ 
	      }
	  });
     
  });


  /* ================================================= UPDATE DATA INVENTORY ===========================================================*/
  function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};
    
    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });
    
    return json;
  }

  $(document).on("click", "#updateButton", function(){ 
      
      var id = $(this).val();
      var form = document.getElementById('updateForm');  

      $("#updateButtonForm").val(id); 

      var data = $.parseJSON(

	      $.ajax({
	          type 			: "GET",
	          url 			: "/inv_mgt/inventory/getById/" + id,
	          contentType 	: "application/json",
	      	  dataType  	: "json",
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