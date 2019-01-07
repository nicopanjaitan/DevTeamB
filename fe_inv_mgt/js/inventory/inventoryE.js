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
  }

      

  /* ================================================= REQUEST BUTTON ===========================================================*/
  function getUserID(){ 
    return document.cookie.split('userID=')[1].split(';')[0];
  } 

  $(document).on("click", "#requestButton", function(){ 
      event.preventDefault();
      
      var id = $(this).val();
      var employeeID = getUserID();

      var form = document.getElementById('requestForm');  
  
      var dataInventory = $.parseJSON( 
  	      $.ajax({
  	          type          : "GET",
  	          url           : "/inv_mgt/inventory/getById/" + id,
  	          contentType   : "application/json",
  	      	  dataType      : "json",
      		  async: false
  	      }).responseText
  	  );

      var dataEmployee = $.parseJSON( 
          $.ajax({
              type          : "GET",
              url           : "/inv_mgt/employee/getById/" + employeeID,
              contentType   : "application/json",
              dataType      : "json",
            async: false
          }).responseText
      );

      $("#employeeID").val(employeeID);
      $("#inventoryID").val(dataInventory.data.code);
      $("#qtyRequest").attr({"max" : dataInventory.data.stock});
      $("#destination").val(dataEmployee.data.address);
      $("#supervisorID").val(dataEmployee.data.supervisorID);

  	  var dataJson = JSON.parse(JSON.stringify(dataInventory.data), function (key, value) { 
       		var formInput = $('[name='+ key +']', form);  
       		formInput.val(value);   
      }); 
	
  });

  $("#requestForm").submit(function(event){
      event.preventDefault();

      var form = document.getElementById('requestForm');
      var dataForm = ConvertFormToJSON(form);

      requestInventory(JSON.stringify(dataForm));
  });

  function requestInventory(data_json){
      $.ajax({
          type         : "POST", 
          data         : data_json,
          contentType  : "application/json",
          url          : "/inv_mgt/request/create",
          success: function(response){
              $("#alert").html('');
              if(response.code == 200){
                jQuery("#requestModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "Inventory has been requested.");  
                viewAll();
              } 
              else{
                $("#alert").html('');
                jQuery("#requestModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "Inventory data not found.");  
             } 
          },
          error: function(response){
              $("#alert").html('');
              jQuery("#requestModal").modal("hide");
              showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
          }
      }).responseText;
  }


  
  /* ================================================= SEARCH NEW DATA ===========================================================*/
  $("#searchForm").submit(function(event){
      var name = $("#name").val(); 

      event.preventDefault();

      searchInventory(name);
  });

  $(document).on("click", "#clearSearch", function(event){
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