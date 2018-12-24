/* =================================  INVENTORY  ================================== */
$(document).ready(function(){

  function getTime(){
    var timeNow = new Date();
    var date = timeNow.getDate();
    var month = timeNow.getMonth();
    var year = timeNow.getFullYear();
    var hours   = timeNow.getHours();
    var minutes = timeNow.getMinutes();
    var seconds = timeNow.getSeconds();

    var hourss = hours;

    if(hours < 10){
      hourss = '0'+ hours;
    }

    var dateTime = date + '' + month + '' + year + '' + hourss + '' + minutes + '' + seconds;

    return dateTime;
  } 

  function showAlert(type){
    if (type === 'Success') {
        $("#alert").append(
           '<div class="alert alert-success " id="alert-success">' + 
              '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
              '<h4><i class="icon fa fa-check"></i> Success!</h4>'+
              'Data has been added'+
            '</div>'    
        );
    }

    else if (type === 'null') {
        $("#alert").append(
           '<div class="alert alert-danger " id="alert-danger">' + 
              '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
              '<h4><i class="icon fa fa-check"></i> Failed!</h4>'+
              'Data has not been added'+
            '</div>'    
        );
    }
  }

   

  /* ================================================= VIEW ALL DATA ===========================================================*/
  var inv_data = '';

  $.ajax({
      type 			: "GET",
      url 			: "/inv_mgt/inventory/getAll",
      contentType 	: "application/json",
      dataType  	: "json",
      success: function(response){

        $.each(response.data, function (i, inventory) {   
          $("#inv_table").append(
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

  
  $(document).on("click", "#addButtonForm", function(){
	  var form = document.getElementById('addForm');  
	  var dataForm = ConvertFormToJSON(form);

      var formData = { 
        code: 'inv_' + getTime(),
        name: $("#name").val(),
        detail: $("#detail").val(),
        price: $("#price").val(),
        stock: $("#stock").val(),
        image: $("#images").val()
      };

      $.ajax({
          type      	: "POST",
          data      	: JSON.stringify(dataForm),
          contentType   : "application/json",
          url      		: "/inv_mgt/inventory/create",
          success: function(response){  
            
          },
          error: function(response){ 
          }
        }).responseText;

  });

      
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

  $(document).on("click", "#stockButtonForm", function(){ 
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






});

/* ==============================  END OF INVENTORY  =============================== */