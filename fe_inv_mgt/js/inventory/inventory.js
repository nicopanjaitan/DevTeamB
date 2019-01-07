/* =================================  INVENTORY  ================================== */
$(document).ready(function(){
  $('.js-example-basic-single').select2();  
 
  /* ================================================= VIEW ALL DATA ===========================================================*/
  viewAll();

  function viewAll(){
     $("#table-content").html('');

      $.ajax({
          type        : "GET",
          url         : "/inv_mgt/inventory/getAll",
          contentType : "application/json",
          dataType  	: "json",
          success: function(response){
            if (response.data == null) {
                $("#main_table").append(
                '<tr><td> No data on records.</td> </tr>'
                ); 
            }
            else{

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

              }

          },
          error: function(response){
              $("#alert").html('');
              jQuery("#formModal").modal("hide");
              showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
          }
      });
  }



  /* ================================================= VIEW DATA BY ID ===========================================================*/
  $(document).on("click", "#viewButton", function(){
      var id = $(this).val();

      $("#viewImage, #inventoryName, #inventoryDetail, #inventoryPrice, #inventoryStock").html('');
 		 
      $.ajax({
    	    type 			: "GET",
    	    dataType  : "json",
    	    url 			: "/inv_mgt/inventory/getById/" + id,
          success: function(response){
              if(response.code == 200){

                $("#viewImage").append(
                    '<img src="'+response.data.image+'" style="width: 100%">'
                );

                $("#inventoryCode").append('<b>'+response.data.code+'</b>');
                $("#inventoryName").append(response.data.name);
                $("#inventoryDetail").append(response.data.detail);
                $("#inventoryPrice").append(response.data.price);
                $("#inventoryStock").append(response.data.stock);
              }
              else{
                $("#alert").html('');
                jQuery("#viewModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "");  
             } 
          },
          error: function(){
              $("#alert").html('');
              jQuery("#formModal").modal("hide");
              showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
          } 
      });  
  });

    

  /* ================================================= SEARCH NEW DATA ===========================================================*/
  $("#searchForm").submit(function(event){
      var name = $("#name").val(); 

      event.preventDefault();

      searchInventory(name);
  });

  $(document).on("click", "#clearSearch", function(){
        $("#btnSearch").html(
            '<button class="btn btn-default" type="submit" id="search">'+
              '<i class="icon fa fa-search"></i>'+
            '</button>'
        );

        $("#table-content").html('');
        $("#name").val('');

        viewAll();
        event.preventDefault();
   
  });

  function searchInventory(name){
      $.ajax({
        type         : "GET",
        url          : "/inv_mgt/inventory/getByName/" + name,
        contentType  : "application/json",
        dataType     : "json",
        success: function(response){
          $("#table-content").html(''); 

          $("#btnSearch").html(
              '<button class="btn btn-default" type="submit" id="clearSearch">'+
                '<i class="icon fa fa-times"></i>'+
              '</button>'
          );

          if(response.code == 200){ 
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
          }
          else{
            $("#main_table").append('<tr><td> No data on records.</td> </tr>');
          } 
        },
        error: function(){
            $("#alert").html('');
            jQuery("#formModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        }

      });
  }

     


  /* ================================================= ADD NEW DATA ===========================================================*/
  $("#addForm").submit(function(){
       addNewData();
  });
  
  function addNewData() { 
    var form = $('#addForm')[0]; 
    var f_data = new FormData(form);
    
    f_data.append("code", null);
    f_data.append("image", null); 

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/inv_mgt/inventory/create",
        data: f_data,
        dataType:"json",
        processData: false,
        contentType: false,
        cache: false,
        timeout: 5000,
        success: function(response){
            $("#alert").html('');
            if(response.code == 200){
              jQuery("#formModal").modal("hide");
              showAllert(response.code, response.code + ' ' + response.message + "!", "Data has been added.");  
              viewAll();
            } 
            else{
              $("#alert").html('');
              jQuery("#formModal").modal("hide");
              showAllert(response.code, response.code + ' ' + response.message + "!", "Something error.");  
           }  
        },
        error: function(response){
            $("#alert").html('');
            jQuery("#formModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        }
    }); 

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

  $(document).on("click", "#stockButton", function(event){
    event.preventDefault();
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

  $(document).on("click", "#stockButtonForm", function(event){
  event.preventDefault(); 
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
	      success: function(response){
            if(response.code == 200){
              $("#alert").html(''); 
              showAllert(response.code, response.code + ' ' + response.message + "!", "Stock updated.");  
              viewAll();
            } 
            else{
              $("#alert").html(''); 
              showAllert(response.code, response.code + ' ' + response.message + "!", "");  
            } 
          },
        error : function(response){
            $("#alert").html('');
            jQuery("#formModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        } 
	  });
     
  });


  /* ================================================= UPDATE DATA INVENTORY ===========================================================*/
  $(document).on("click", "#updateButton", function(event){
      event.preventDefault(); 
      
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


  $(document).on("click", "#updateButtonForm", function(event){
    event.preventDefault();

	  var id = $(this).val();  
	  var form = document.getElementById('updateForm'); 
	  var dataForm = ConvertFormToJSON(form); 

	  $.ajax({
	      type       	: "PUT",
	      url     		: "/inv_mgt/inventory/updateById/" + id,
	      data       	: JSON.stringify(dataForm),
	      contentType   : "application/json",
		    dataType  	: "json",
	      success: function(response){
            if(response.code == 200){
              $("#alert").html(''); 
              jQuery("#updateModal").modal("hide");
              showAllert(response.code, response.code + ' ' + response.message + "!", "Inventory data updated.");  
              viewAll();
            } 
            else{
              $("#alert").html(''); 
              jQuery("#updateModal").modal("hide");
              showAllert(response.code, response.code + ' ' + response.message + "!", "");  
            } 
          },
        error : function(response){
            $("#alert").html('');
            jQuery("#updateModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        } 
	  }).responseText;
     
  });


  /* ================================================= DELETE DATA ===========================================================*/
  $(document).on("click", "#deleteButton", function(event){
      event.preventDefault();

      var id = $(this).val(); 
  
      $.ajax({
          type      	: "DELETE",
          url       	: "/inv_mgt/inventory/deleteById/" + id,
          contentType : "application/json",
	  	    dataType  	: "json",
          success: function(response){
            if(response.code == 200){
              $("#alert").html(''); 
              showAllert(response.code, response.code + ' ' + response.message + "!", "Record deleted.");  
              viewAll();
            } 
            else{
              $("#alert").html(''); 
              showAllert(response.code, response.code + ' ' + response.message + "!", "");  
            } 
          },
          error : function(response){
              $("#alert").html('');
              jQuery("#formModal").modal("hide");
              showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
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