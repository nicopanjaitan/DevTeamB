/* =================================  INVENTORY  ================================== */
$(document).ready(function(){ 
  $('.js-example-basic-single').select2();  
  
  $.get("/template/sidebar.html", function (data) {
      $("aside").append(data);
  });   
  
  /* ================================================= VIEW ALL DATA ===========================================================*/
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
  $(document).on("click", "#submitForm", function(event){

      var form = document.getElementById('employeeForm');
      var dataForm = ConvertFormToJSON(form); 

      var obj = JSON.parse(JSON.stringify(dataForm), function (key, value) {
        if (value == "") {
          exit;
        } 
      });
       
      $.ajax({
          type         : "POST", 
          data         : JSON.stringify(dataForm),
          contentType  : "application/json",
          url          : "/inv_mgt/employee/create",
          success: function(response){
              $("#alert").html('');
              if(response.code == 200){
                jQuery("#formModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "Data has been added.");  
                setTimeout(function(){ location.reload(); }, 1000);
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
  });
  

  
  /* ================================================= SELECT SUPERVISOR ===========================================================*/
  $(document).on("click", "#selectButton", function(){
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

  $(document).on("click", "#selectButtonForm", function(){
  	  var employeeID = $(this).val(); 

      var form = document.getElementById('selectForm');
      var dataForm = ConvertFormToJSON(form); 
 
      $.ajax({
          type         : "PUT",
          url          : "/inv_mgt/employee/selectSupervisorById/" + employeeID,
          data         : JSON.stringify(dataForm),
          contentType  : "application/json",
      	  dataType     : "json",
          success: function(response){
            $("#alert").html('');
              if(response.code == 200){
                jQuery("#viewModal").modal("hide");
                jQuery("#selectModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "Supervisor has been selected.");  
                setTimeout(function(){ location.reload(); }, 1000);
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
     
  });




  /* ================================================= UPDATE DATA  ===========================================================*/
  $(document).on("click", "#updateButton", function(){ 
      
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


  $(document).on("click", "#submitFormUpdate", function(){ 
	  var employeeID = $(this).val();  
    
	  var form = document.getElementById('employeeFormUpdate'); 
	  var dataForm = ConvertFormToJSON(form);

	  $.ajax({
	      type       	: "PUT",
	      url     		: "/inv_mgt/employee/updateById/" + employeeID,
	      data       	: JSON.stringify(dataForm),
	      contentType : "application/json",
		    dataType  	: "json",
	      success: function(response){
            $("#alert").html('');
              if(response.code == 200){
                jQuery("#updateModal").modal("hide");
                showAllert(response.code, response.code + ' ' + response.message + "!", "Data has been updated.");  
                setTimeout(function(){ location.reload(); }, 1000);
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
     
  });



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
              setTimeout(function(){ location.reload(); }, 1000);
            } 
            else{
              $("#alert").html(''); 
              showAllert(response.code, response.code + ' ' + response.message + "!", "");  
            } 
          },
          error: function(){
              $("#alert").html(''); 
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