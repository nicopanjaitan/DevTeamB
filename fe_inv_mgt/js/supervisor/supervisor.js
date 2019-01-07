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
          url          : "/inv_mgt/supervisor/getAll",
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
                      +'<td class="col-md-1">' +  
                        '<div class="dropdown">'+
              		    		'<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
              		    		'<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
              				      '<li><button id="viewButton" class="btn" value="' + value.supervisorID + '" '+
                              			'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                      			  '<li><button id="updateButton" class="btn" value="' + value.supervisorID + '" '+
                              			'data-toggle="modal" data-target="#formModalUpd" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                              	  '<li><button id="deleteButton" class="btn" value="' + value.supervisorID + '" >'+
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
      var supervisorID = $(this).val();
  	  $("#e_id, #e_name, #e_email").html('');

      $.ajax({
  	    type         : "GET",
        url          : "/inv_mgt/supervisor/getById/" + supervisorID,
        contentType  : "application/json",
  	    dataType     : "json",
  	    success: function(response){
          if(response.code == 200){
            $("#e_id").append('<b>'+response.data.supervisorID+'</b>');
            $("#e_name").append(response.data.name);
            $("#e_email").append(response.data.email); 

            $("#selectButtonForm").val(employeeID);
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
        url          : "/inv_mgt/supervisor/getByName/" + name,
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
                      +'<td class="col-md-1">' +  
                        '<div class="dropdown">'+
                          '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
                          '<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
                            '<li><button id="viewButton" class="btn" value="' + value.supervisorID + '" '+
                                    'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                              '<li><button id="updateButton" class="btn" value="' + value.supervisorID + '" '+
                                    'data-toggle="modal" data-target="#formModalUpd" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                                  '<li><button id="deleteButton" class="btn" value="' + value.supervisorID + '" >'+
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
  $("#supervisorForm").submit(function(event){ 
      event.preventDefault();

      var form = document.getElementById('supervisorForm');
      var dataForm = ConvertFormToJSON(form);
      
      addNewData(JSON.stringify(dataForm));
  });

  function addNewData(data_json){        
      $.ajax({
          type         : "POST", 
          data         : data_json,
          contentType  : "application/json",
          dataType     :"json",
          url          : "/inv_mgt/supervisor/create",
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
  
  

  /* ================================================= UPDATE DATA ===========================================================*/
  $(document).on("click", "#updateButton", function(event){
      event.preventDefault();

      var supervisorID = $(this).val();
      var form = document.getElementById('supervisorFormUpd');   
 
      $("#submitFormUpd").val(supervisorID);  

      var data = $.parseJSON(
  	      $.ajax({
  	          type         : "GET",
  	          url          : "/inv_mgt/supervisor/getById/" + supervisorID,
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

  $("#supervisorFormUpd").submit(function(event){ 
      event.preventDefault();

      var supervisorID = $("#submitFormUpd").val();  
      var form = document.getElementById('supervisorFormUpd');
      var dataForm = ConvertFormToJSON(form);
      
      updateData(supervisorID, JSON.stringify(dataForm));
  });


  function updateData(supervisorID, data_json){ 
  	  $.ajax({
  	      type       	: "PUT",
  	      url     		: "/inv_mgt/supervisor/updateById/" + supervisorID,
  	      data       	: data_json,
  	      contentType : "application/json",
  		    dataType  	: "json",
  	      success: function(response){
                $("#alert").html('');
                if(response.code == 200){
                  jQuery("#formModalUpd").modal("hide");
                  showAllert(response.code, response.code + ' ' + response.message + "!", "Data has been updated.");  
                  viewAll();
                }
                else{
                  $("#alert").html('');
                  jQuery("#formModalUpd").modal("hide");
                  showAllert(response.code, response.code + ' ' + response.message + "!", "");  
                } 
            },
            error: function(response){
                $("#alert").html('');
                jQuery("#formModalUpd").modal("hide");
                showAllert(response.responseJSON.status, response.responseJSON.status + ' ' + response.responseJSON.error + "!", response.responseJSON.message);  
            }
  	  }).responseText;
     
  }



  /* ================================================= DELETE DATA ===========================================================*/
  $(document).on("click", "#deleteButton", function(){
      var supervisorID = $(this).val(); 
  
      $.ajax({
          type        : "DELETE",
          url         : "/inv_mgt/supervisor/deleteById/" + supervisorID,
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



  /* ================================================= SEARCH NEW DATA ===========================================================*/
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


   $(document).on("click", "#search", function(){
    var supervisorID = $("#selectOption").val();

    $.ajax({
      type         : "GET",
      url          : "/inv_mgt/supervisor/getById" + supervisor,
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
                  +'<td class="col-md-1">' +  
                    '<div class="dropdown">'+
                      '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><i class="icon fa fa-wrench"></i> Tools</button>'+
                      '<ul class="dropdown-menu dropdown-menu-right" id="dropdownTools">'+
                        '<li><button id="viewButton" class="btn" value="' + value.supervisorID + '" '+
                                'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                          '<li><button id="updateButton" class="btn" value="' + value.supervisorID + '" '+
                                'data-toggle="modal" data-target="#formModalUpd" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                              '<li><button id="deleteButton" class="btn" value="' + value.supervisorID + '" >'+
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