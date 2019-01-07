/* =======================================================  REQUEST  =================================================== */
$(document).ready(function(){
  $('.js-example-basic-single').select2(); 

  function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};
    
    jQuery.each(array, function() { 
        json[this.name] = this.value || '';
    });
    
    return json;
  }
 

  /* ============================================= ADDITION ====================================================*/
  function getRoles(){ 
    return document.cookie.split('roles=')[1].split(';')[0];
  } 

  function getUserID(){ 
    return document.cookie.split('userID=')[1].split(';')[0];
  }



  /* ============================================= VIEW ALL DATA =====================================================*/
  viewAll();

  alert(document.cookie);

  function viewAll(){
     if(getRoles() == "employee"){
        viewByEmployee();
     }
     else if(getRoles() == "supervisor"){
        viewBySupervisor();
     }
     else if(getRoles() == "admin"){
        viewByAdmin();
     }
  }

  function viewByEmployee(){
      $("#table-content").html('');
      var employeeID = getUserID();

      $.ajax({
          type          : "GET",
          url           : "/inv_mgt/request/getByEmployeeId/" + employeeID,
          contentType   : "application/json",
          dataType      : "json",
          success: function(response){

            if (response.code != 200) {
              $("#main_table").append(
                '<tr><td> No data on records.</td> </tr>'
                ); 
            }
            else{

              $.each(response.data, function (i, request) {   
                $("#main_table").append(
                  '<tr>'
                    +'<td>' + (i+1) + '</td>'
                    +'<td>' + request.employeeID + '</td>'
                    +'<td>' + request.supervisorID + '</td>'
                    +'<td>' + request.inventoryID + '</td>'
                    +'<td>' + request.qtyRequest + '</td>'
                    +'<td>' + request.destination + '</td>'
                    +'<td>' + request.dateRequest + '</td>'
                    +'<td>' + request.dateReceived + '</td>'
                    +'<td>' + request.status + '</td>'
                    +'<td class="col-md-1">' +  
                      '<div class="dropdown">'+
                        '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
                        '<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
                            '<li id="viewB"><button id="viewButton" class="btn" value="' + request.requestID + '" '+
                                  'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                            '<li id="updateB"><button id="updateButton" class="btn" value="' + request.requestID + '" '+
                                  'data-toggle="modal" data-target="#updateModal" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                            '<li id="deleteB"><button id="deleteButton" class="btn" value="' + request.requestID + '" >'+
                                    '<i class="icon fa fa-trash"></i> Delete</button></li>'+ 
                        '</ul>'+
                      '</div>'
                    +'</td>' +
                  '</tr>'
                );  

                if(request.employeeID  != getUserID()){ 
                   $("#updateB, #deleteB").html('');
                }

              });

              

            }

          },
          error: function(response){
              alert('Something error');
          }
      });
  }

  function viewBySupervisor(){
      $("#table-content").html('');
      var supervisorID = getUserID();

      $.ajax({
          type          : "GET",
          url           : "/inv_mgt/request/getBySupervisorId/" + supervisorID,
          contentType   : "application/json",
          dataType      : "json",
          success: function(response){

            if (response.code != 200) {
              $("#main_table").append(
                '<tr><td> No data on records.</td> </tr>'
                ); 
            }
            else{

              $.each(response.data, function (i, request) {   
                $("#main_table").append(
                  '<tr>'
                    +'<td>' + (i+1) + '</td>'
                    +'<td>' + request.employeeID + '</td>'
                    +'<td>' + request.supervisorID + '</td>'
                    +'<td>' + request.inventoryID + '</td>'
                    +'<td>' + request.qtyRequest + '</td>'
                    +'<td>' + request.destination + '</td>'
                    +'<td>' + request.dateRequest + '</td>'
                    +'<td>' + request.dateReceived + '</td>'
                    +'<td>' + request.status + '</td>'
                    +'<td class="col-md-1">' +  
                      '<div class="dropdown">'+
                        '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
                        '<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
                            '<li id="viewB"><button id="viewButton" class="btn" value="' + request.requestID + '" '+
                                  'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                            '<li id="updateB"><button id="updateButton" class="btn" value="' + request.requestID + '" '+
                                  'data-toggle="modal" data-target="#updateModal" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                            '<li id="deleteB"><button id="deleteButton" class="btn" value="' + request.requestID + '" >'+
                                    '<i class="icon fa fa-trash"></i> Delete</button></li>'+ 
                        '</ul>'+
                      '</div>'
                    +'</td>' +
                  '</tr>'
                );  

                if(request.employeeID  != getUserID()){ 
                   $("#updateB, #deleteB").html('');
                }

              });

              

            }

          },
          error: function(response){
              alert('Something error');
          }
      });
  }


  function viewByAdmin(){
      $("#table-content").html('');

      $.ajax({
          type          : "GET",
          url           : "/inv_mgt/request/getAll",
          contentType   : "application/json",
          dataType      : "json",
          success: function(response){

            if (response.code != 200) {
              $("#main_table").append(
                '<tr><td> No data on records.</td> </tr>'
                ); 
            }
            else{

              $.each(response.data, function (i, request) {   
                $("#main_table").append(
                  '<tr>'
                    +'<td>' + (i+1) + '</td>'
                    +'<td>' + request.employeeID + '</td>'
                    +'<td>' + request.supervisorID + '</td>'
                    +'<td>' + request.inventoryID + '</td>'
                    +'<td>' + request.qtyRequest + '</td>'
                    +'<td>' + request.destination + '</td>'
                    +'<td>' + request.dateRequest + '</td>'
                    +'<td>' + request.dateReceived + '</td>'
                    +'<td>' + request.status + '</td>'
                    +'<td class="col-md-1">' +  
                      '<div class="dropdown">'+
            		    		'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
            		    		'<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
            				        '<li id="viewB"><button id="viewButton" class="btn" value="' + request.requestID + '" '+
                            			'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                    			  '<li id="updateB"><button id="updateButton" class="btn" value="' + request.requestID + '" '+
                            			'data-toggle="modal" data-target="#updateModal" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                        	  '<li id="deleteB"><button id="deleteButton" class="btn" value="' + request.requestID + '" >'+
                            	  		'<i class="icon fa fa-trash"></i> Delete</button></li>'+ 
            		    		'</ul>'+
            		  		'</div>'
                    +'</td>' +
                  '</tr>'
                );  

                if(request.employeeID  != getUserID()){ 
                   $("#updateB, #deleteB").html('');
                }

              });

              

            }

          },
          error: function(response){
              alert('Something error');
          }
      });
  }

 

  /* ============================================= VIEW DATA BY ID ====================================================*/
  
  $(document).on("click", "#viewButton", function(){
      var requestID = $(this).val();
  	  $("#r_id, #r_employee, #e_supervisor, #e_inventory, #e_qty, #e_destination, #e_request, #e_received, #e_status").html(''); 

      $.ajax({
  	    type          : "GET",
        url           : "/inv_mgt/request/getById/" + requestID,
        contentType   : "application/json",
  	    dataType      : "json",
  	    success: function(response){

          if (response.code != 200) {
              $("#alert").html('');
              jQuery("#viewModal").modal("hide");
              showAllert(response.code, response.code + ' ' + response.message + "!", "");  
          } 
          else{
            $("#approved").val(requestID);
            $("#handovered").val(requestID); 
            $("#canceled").val(requestID);     
            $("#rejected").val(requestID);     

            $("#r_id").append('<b>'+response.data.requestID+'</b>');
            $("#r_employee").append(response.data.employeeID);
            $("#e_supervisor").append(response.data.supervisorID);
            $("#e_inventory").append(response.data.inventoryID);
            $("#e_qty").append(response.data.qtyRequest);
            $("#e_destination").append(response.data.destination);
            $("#e_request").append(response.data.dateRequest);
            $("#e_received").append(response.data.dateReceived);
            $("#e_status").append(response.data.status);

            if(response.data.status == "Pending"){
                $("#handovered").hide();

                if(getRoles() == "employee"){
                    $("#approved, #rejected, #handovered").hide(); 
                    $("#canceled").show();//only cancel button                   
                }
                else if(getRoles() == "supervisor"){
                    $("#canceled, #handovered").hide(); 
                    $("#approved, #rejected").show();//can approved nd rejected                 
                }
            }
            else if(response.data.status == "Approved"){
                if(getRoles() == "employee"){
                    $("#approved, #canceled, #rejected, #handovered").hide();  //nothing                  
                }
                else if(getRoles() == "supervisor"){
                    $("#approved, #canceled, #rejected").hide(); 
                    $("#handovered").show();//only handover                   
                }
            }
            else if(response.data.status == "Rejected" || response.data.status == "Received"){
                $("#approved, #handovered, #canceled, #rejected").hide();
            }
          }
  	           
  	    },
  	    error: function(url){
            $("#alert").html('');
            jQuery("#viewModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        } 
      });
  });



  /* ============================================= APPROVED DATA ====================================================*/
  $(document).on("click", "#approved", function(event){
    event.preventDefault(); 
    var requestID = $(this).val();    
   
    $.ajax({
        type        : "PUT",
        url         : "/inv_mgt/request/approvedById/" + requestID,
        contentType : "application/json",
        dataType    : "json",
        success: function(response){
          if(response.code == 200){
            $("#alert").html(''); 
            jQuery("#viewModal").modal("hide");
            showAllert(response.code, response.code + ' ' + response.message + "!", "Request has been approved.");  
            viewAll();
          } 
          else{
            $("#alert").html(''); 
            jQuery("#viewModal").modal("hide");
            showAllert(response.code, response.code + ' ' + response.message + "!", "");  
          } 
        },
        error : function(response){
            $("#alert").html('');
            jQuery("#viewModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        } 
    }).responseText;
     
  });

  /* ============================================= CANCELED DATA ====================================================*/
  $(document).on("click", "#canceled", function(event){
    event.preventDefault(); 
    var requestID = $(this).val();    
   
    $.ajax({
        type        : "PUT",
        url         : "/inv_mgt/request/canceledById/" + requestID,
        contentType : "application/json",
        dataType    : "json",
        success: function(response){
          if(response.code == 200){
            $("#alert").html(''); 
            jQuery("#viewModal").modal("hide");
            showAllert(response.code, response.code + ' ' + response.message + "!", "Request has been canceled.");  
            viewAll();
          } 
          else{
            $("#alert").html(''); 
            jQuery("#viewModal").modal("hide");
            showAllert(response.code, response.code + ' ' + response.message + "!", "");  
          } 
        },
        error : function(response){
            $("#alert").html('');
            jQuery("#viewModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        } 
    }).responseText;
     
  }); 
   

  /* ============================================= REJECTED DATA ====================================================*/
  $(document).on("click", "#rejected", function(event){ 
    event.preventDefault(); 
    var requestID = $(this).val();    
   
    $.ajax({
        type        : "PUT",
        url         : "/inv_mgt/request/rejectById/" + requestID,
        contentType : "application/json",
        dataType    : "json",
        success: function(response){
          if(response.code == 200){
            $("#alert").html(''); 
            jQuery("#viewModal").modal("hide");
            showAllert(response.code, response.code + ' ' + response.message + "!", "Request has been rejected.");  
            viewAll();
          } 
          else{
            $("#alert").html(''); 
            jQuery("#viewModal").modal("hide");
            showAllert(response.code, response.code + ' ' + response.message + "!", "");  
          } 
        },
        error : function(response){
            $("#alert").html('');
            jQuery("#viewModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        } 
    }).responseText;
     
  });


  /* ============================================= HANDOVERED DATA ====================================================*/
  $(document).on("click", "#handovered", function(event){
    event.preventDefault(); 
    var requestID = $(this).val();    
   
    $.ajax({
        type        : "PUT",
        url         : "/inv_mgt/request/handoverById/" + requestID,
        contentType : "application/json",
        dataType    : "json",
        success: function(response){
          if(response.code == 200){
            $("#alert").html(''); 
            jQuery("#viewModal").modal("hide");
            showAllert(response.code, response.code + ' ' + response.message + "!", "Request has been handovered.");  
            viewAll();
          } 
          else{
            $("#alert").html(''); 
            jQuery("#viewModal").modal("hide");
            showAllert(response.code, response.code + ' ' + response.message + "!", "");  
          } 
        },
        error : function(response){
            $("#alert").html('');
            jQuery("#viewModal").modal("hide");
            showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
        } 
    }).responseText;
     
  }); 



   
  /* ================================================= ADD NEW DATA ===========================================================*/
  $(document).on("click", "#addButton", function(){
    //hanya utk percobaan, pakai id langsung
    var employeeID = getUserID();
    var form = document.getElementById('addForm'); 

    //set some data to form
    loadToCreateForm(employeeID, form);   
  });

  $(document).on("click", "#addButtonForm", function(){ 
      
    var form = document.getElementById('addForm'); 
    var dataForm = ConvertFormToJSON(form);   

    $.ajax({
        type          : "POST",
        data          : JSON.stringify(dataForm),
        contentType   : "application/json",
        url           : "/inv_mgt/request/create/" + employeeID,
        success: function(response){  
          if (response.code != 200) {
            alert('Request Error'); 
          }
          else{
            alert('Success Added');
            location.reload();
          }
        },
        error: function(response){ 
          alert('Something error');
        }
      }).responseText;

  });

  //on click button will write data to form
  function loadToCreateForm (employeeID){     
 
      //get data by id
      var data = $.parseJSON( 
          $.ajax({
              type          : "GET",
              url           : "/inv_mgt/employee/getById/" + employeeID,
              contentType   : "application/json",
              dataType      : "json",
              async         : false
          }).responseText
      );
 
      //set data to form
      var data = $.parseJSON(JSON.stringify(data.data));
      $("#employeeName").html(data['name']);
      $("#supervisorID").val(data['supervisorID']);
 
  }



  /* ================================================= UPDATE DATA ===========================================================*/ 
  //on click button will write data to form
  $(document).on("click", "#updateButton", function(){ 
      var id = $(this).val();
      var form = document.getElementById('updateForm');  

      //set id to the button
      $("#updateButtonForm").val(id); 

      //get data by id
      var data = $.parseJSON( 
  	      $.ajax({
  	          type          : "GET",
  	          url           : "/inv_mgt/employee/getById/" + id,
  	          contentType   : "application/json",
  	      	  dataType      : "json",
      		    async         : false
  	      }).responseText
  	  );

      //set data to form
  	  var dataJson = JSON.parse(JSON.stringify(data.data), function (key, value) { 
       		var formInput = $('[name='+ key +']', form);  
       		formInput.val(value);   
      });
	
  });

  //onclcik will put data to db
  $(document).on("click", "#updateButtonForm", function(){ 
	  var id = $(this).val();   

    //get data form in json
    var form = document.getElementById('updateForm'); 
	  var dataForm = ConvertFormToJSON(form);  

    //put data
	  $.ajax({
	      type       	: "PUT",
	      url     		: "/inv_mgt/employee/updateById/" + id,
	      data       	: JSON.stringify(dataForm),
	      contentType : "application/json",
		    dataType  	: "json",
	      success : function(response){ 
          if (response.data == null) {
            alert('Data not found'); 
          }
          else{
            alert('Success updated');
          }
	      },
	      error : function(response){ 
          alert('Something error');
	      }
	  }).responseText;
     
  });


  /* ================================================= DELETE DATA ===========================================================*/
  $(document).on("click", "#deleteButton", function(event){
      event.preventDefault();
      var requestID = $(this).val();  
  
      $.ajax({
          type          : "DELETE",
          url           : "/inv_mgt/request/deleteById/" + requestID,
          contentType   : "application/json",
	  	    dataType      : "json",
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
        url          : "/inv_mgt/request/getByName/" + name,
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

/* ==============================  END OF REQUEST  =============================== */