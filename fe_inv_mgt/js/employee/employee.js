/* =================================  INVENTORY  ================================== */
$(document).ready(function(){ 
  $('.js-example-basic-single').select2();  
  
  $.get("/template/sidebar.html", function (data) {
      $("aside").append(data);
  });   
  
  /* ================================================= VIEW ALL DATA ===========================================================*/
  viewAll();

  function viewAll(){
      $("#table-content").html('');

      $.ajax({
          type         : "GET",
          url          : "/inv_mgt/employee/getAll",
          contentType  : "application/json",
          dataType     : "json",
          success: function(response){
            if (response.data == null) {
                $("#main_table").append(
                '<tr><td> No data on records.</td> </tr>'
                ); 
            }
            else{
                $.each(response.data, function (i, value) {   
                  $("#main_table").append(
                    '<tr>'
                      +'<td>' + (i+1) + '</td>'
                      +'<td>' + value.name + '</td>'
                      +'<td>' + value.email + '</td>'
                      +'<td>' + value.address + '</td>'
                      +'<td>' + value.supervisorID + '</td>'
                      +'<td class="col-md-1">' +  
                        '<div class="dropdown">'+
              		    		'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
              		    		'<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
              				      '<li><button id="viewButton" class="btn" value="' + value.employeeID + '" '+
                              			'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                      			  '<li><button id="updateButton" class="btn" value="' + value.employeeID + '" '+
                              			'data-toggle="modal" data-target="#updateModal" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                              	  '<li><button id="deleteButton" class="btn" value="' + value.employeeID + '" >'+
                              	  		'<i class="icon fa fa-trash"></i> Delete</button></li>'+ 
              		    		'</ul>'+
              		  		'</div>'
                      +'</td>' +
                    '</tr>'
                    );  
                });
            } 
          },
          error: function(){
              $("#alert").html('');
              jQuery("#formModal").modal("hide");
              showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
          }
      });
  }



  /* ================================================= VIEW DATA BY ID ===========================================================*/
  $(document).on("click", "#viewButton", function(){
      var employeeID = $(this).val();
  	  $("#e_id, #e_name, #e_email, #e_address, #e_supervisor").html('');

      $.ajax({
  	    type         : "GET",
        url          : "/inv_mgt/employee/getById/" + employeeID,
        contentType  : "application/json",
  	    dataType     : "json",
  	    success: function(response){
          if(response.code == 200){
            $("#e_id").append('<b>'+response.data.employeeID+'</b>');
            $("#e_name").append(response.data.name);
            $("#e_email").append(response.data.email);
            $("#e_address").append(response.data.address);
            $("#e_supervisor").append(response.data.supervisorID);
      
            $("#selectButton").val(employeeID);
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

       

  /* ================================================= ADD NEW DATA ===========================================================*/
  $("#employeeForm").submit(function(event){
      event.preventDefault();

      var form = document.getElementById('employeeForm');
      var dataForm = ConvertFormToJSON(form);

      addNewData(JSON.stringify(dataForm));
  });

  function addNewData(data_json){ 
       
      $.ajax({
          type         : "POST", 
          data         : data_json,
          contentType  : "application/json",
          url          : "/inv_mgt/employee/create",
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
                showAllert(response.code, response.code + ' ' + response.message + "!", "Email already use.");  
             } 
          },
          error: function(response){
              $("#alert").html('');
              jQuery("#formModal").modal("hide");
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
        url          : "/inv_mgt/employee/getByName/" + name,
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
            $.each(response.data, function (i, value) {   
                $("#main_table").append(
                    '<tr>'
                      +'<td>' + (i+1) + '</td>'
                      +'<td>' + value.name + '</td>'
                      +'<td>' + value.email + '</td>'
                      +'<td>' + value.address + '</td>'
                      +'<td>' + value.supervisorID + '</td>'
                      +'<td class="col-md-1">' +  
                        '<div class="dropdown">'+
                          '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
                          '<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
                            '<li><button id="viewButton" class="btn" value="' + value.employeeID + '" '+
                                    'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                              '<li><button id="updateButton" class="btn" value="' + value.employeeID + '" '+
                                    'data-toggle="modal" data-target="#updateModal" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                                  '<li><button id="deleteButton" class="btn" value="' + value.employeeID + '" >'+
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

     

  
  /* ================================================= SELECT SUPERVISOR ===========================================================*/
  $(document).on("click", "#selectButton", function(event){
      event.preventDefault();

      var employeeID = $(this).val();
      $("#selectButtonForm").val(employeeID);

      $.ajax({
          type         : "GET",
          url          : "/inv_mgt/supervisor/getAll",
          contentType  : "application/json",
          dataType     : "json",
          success: function(response){
            if (response.data == null) {
                
            }
            else{
                $.each(response.data, function (i, value) {
                  $("#selectOption").append(
                    '<option value="'+value.supervisorID+'">'+value.name+'</option>'
                  ); 
                });
            } 
          }
      });
  });

  $("#selectForm").submit(function(event){ 
      event.preventDefault();

      var employeeID = $("#selectButtonForm").val();  
      var form = document.getElementById('selectForm');
      var dataForm = ConvertFormToJSON(form);
      
      selectSupervisor(employeeID, JSON.stringify(dataForm));
  });

  function selectSupervisor(employeeID, data_json){ 
      $.ajax({
          type         : "PUT",
          url          : "/inv_mgt/employee/selectSupervisorById/" + employeeID,
          data         : data_json,
          contentType  : "application/json",
      	  dataType     : "json",
          success: function(response){
              $("#alert").html('');
              if(response.code == 200){
                jQuery("#viewModal").modal("hide");
                jQuery("#selectModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "Supervisor has been selected.");  
                viewAll();
              } 
              else{
                $("#alert").html('');
                jQuery("#viewModal").modal("hide");
                jQuery("#selectModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "");  
              } 
          },
          error: function(response){
              $("#alert").html('');
              jQuery("#viewModal").modal("hide");
              jQuery("#selectModal").modal("hide");
              showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
          }
      });
     
  }




  /* ================================================= UPDATE DATA  ===========================================================*/
  $(document).on("click", "#updateButton", function(event){
      event.preventDefault(); 
      
      var employeeID = $(this).val();
      var form = document.getElementById('employeeFormUpdate');   
      
      $("#submitFormUpdate").val(employeeID);  

      var data = $.parseJSON(
  	      $.ajax({
  	          type         : "GET",
  	          url          : "/inv_mgt/employee/getById/" + employeeID,
  	          contentType  : "application/json",
  	      	  dataType     : "json",
      		    async: false
  	      }).responseText
  	  );

  	  var dataJson = JSON.parse(JSON.stringify(data.data), function (key, value) { 
       		var formInput = $('[name='+ key +']', form);  
       		formInput.val(value);   
      });
	
  });

  $("#employeeFormUpdate").submit(function(event){
      event.preventDefault();

      var employeeID = $("#submitFormUpdate").val();
      var form = document.getElementById('employeeFormUpdate');
      var dataForm = ConvertFormToJSON(form);

      updateData(employeeID, JSON.stringify(dataForm)); 
  });
 
  function updateData(employeeID, data_json){  
	  $.ajax({
	      type       	: "PUT",
	      url     		: "/inv_mgt/employee/updateById/" + employeeID,
	      data       	: data_json,
	      contentType : "application/json",
		    dataType  	: "json",
	      success: function(response){
            $("#alert").html('');
              if(response.code == 200){
                jQuery("#updateModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "Data has been updated.");  
                viewAll();
              } 
              else{
                $("#alert").html('');
                jQuery("#updateModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "");  
              } 
          },
        error: function(response){
            $("#alert").html('');
            jQuery("#updateModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        }
	  }).responseText;
     
  }



  /* ================================================= DELETE DATA ===========================================================*/
  $(document).on("click", "#deleteButton", function(){
      var employeeID = $(this).val(); 
  
      $.ajax({
          type        : "DELETE",
          url         : "/inv_mgt/employee/deleteById/" + employeeID,
          contentType : "application/json",
	  	    dataType    : "json", 
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