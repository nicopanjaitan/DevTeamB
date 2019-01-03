/* =======================================================  REQUEST  =================================================== */
$(document).ready(function(){
  $('.js-example-basic-single').select2(); 

  $.get("/template/sidebar.html", function (data) {
      $("aside").append(data);
  });  

  function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};
    
    jQuery.each(array, function() { 
        json[this.name] = this.value || '';
    });
    
    return json;
  }
 
  /* ============================================= VIEW ALL DATA =====================================================*/
 
  $.ajax({
      type          : "GET",
      url           : "/inv_mgt/request/getAll",
      contentType   : "application/json",
      dataType      : "json",
      success: function(response){

        if (response.data == null) {
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
        				      '<li><button id="viewButton" class="btn" value="' + request.requestID + '" '+
                        			'data-toggle="modal" data-target="#viewModal" ><i class="icon fa fa-eye"></i> View</button></li>'+
                			  '<li><button id="updateButton" class="btn" value="' + request.requestID + '" '+
                        			'data-toggle="modal" data-target="#updateModal" ><i class="icon fa fa-edit"></i> Edit</button></li>'+ 
                        	  '<li><button id="deleteButton" class="btn" value="' + request.requestID + '" >'+
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
          alert('Something error');
      }
  });

  /* ============================================= VIEW DATA BY ID ====================================================*/
  $(document).on("click", "#viewButton", function(){
      var id = $(this).val();
  	  $("#r_id, #r_employee, #e_supervisor, #e_inventory, #e_qty, #e_destination, #e_request, #e_received, #e_status").html(''); 

      $.ajax({
  	    type          : "GET",
        url           : "/inv_mgt/request/getById/" + id,
        contentType   : "application/json",
  	    dataType      : "json",
  	    success: function(response){

          if (response.data == null) {
            alert('Data not found'); 
          }
          else{
            $("#approved").val(id);
            $("#handovered").val(id);     
            $("#rejected").val(id);     

            $("#r_id").append('<b>'+response.data.requestID+'</b>');
            $("#r_employee").append(response.data.employeeID);
            $("#e_supervisor").append(response.data.supervisorID);
            $("#e_inventory").append(response.data.inventoryID);
            $("#e_qty").append(response.data.qtyRequest);
            $("#e_destination").append(response.data.destination);
            $("#e_request").append(response.data.dateRequest);
            $("#e_received").append(response.data.dateReceived);
            $("#e_status").append(response.data.status);
          }
  	           
  	    },
  	    error: function(url){
           alert('Something Error');
  	    }
      });
  });

  /* ============================================= APPROVED DATA ====================================================*/
  $(document).on("click", "#approved", function(){ 
    var id = $(this).val();    
   
    $.ajax({
        type        : "PUT",
        url         : "/inv_mgt/request/approvedById/" + id,
        contentType : "application/json",
        dataType    : "json",
        success : function(response){ 
          $('#viewModal').modal('hide');

          if (response.code != 200) {
            showAllert(response.code, "Bad Request!", "The previous status is not appropriate.");
            location.reload();
          }
          else{
            showAllert(response.code, "Success!", "Form request has been approved.");
          }
        },
        error : function(response){ 
          alert('Something Error');
        }
    }).responseText;
     
  });

  /* ============================================= REJECTED DATA ====================================================*/
  $(document).on("click", "#rejected", function(){ 
    var id = $(this).val();    
   
    $.ajax({
        type        : "PUT",
        url         : "/inv_mgt/request/rejectById/" + id,
        contentType : "application/json",
        dataType    : "json",
        success : function(response){ 
          if (response.code != 200) {
            alert('Request Error'); 
          }
          else{
            alert('Rejected');
            location.reload();
          }
        },
        error : function(response){ 
          alert('Something Error');
        }
    }).responseText;
     
  });

  /* ============================================= HANDOVERED DATA ====================================================*/
  $(document).on("click", "#handovered", function(){ 
    var id = $(this).val();    
   
    $.ajax({
        type        : "PUT",
        url         : "/inv_mgt/request/handoverById/" + id,
        contentType : "application/json",
        dataType    : "json",
        success : function(response){ 
          if (response.code != 200) {
            alert('Request Error'); 
          }
          else{
            alert('Handovered');
            location.reload();
          }
        },
        error : function(response){ 
          alert('Something Error');
        }
    }).responseText;
     
  }); 
   
  /* ================================================= ADD NEW DATA ===========================================================*/
  $(document).on("click", "#addButton", function(){
    //hanya utk percobaan, pakai id langsung
    var employeeID = "emp_20181226084033";
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
  $(document).on("click", "#deleteButton", function(){
      var id = $(this).val();  
  
      $.ajax({
          type          : "DELETE",
          url           : "/inv_mgt/request/deleteById/" + id,
          contentType   : "application/json",
	  	    dataType      : "json",
          success : function(response){  
            alert('Deleted');
            location.reload();
          },
          error : function(response){ 
            alert('Something error');
          }
      });
  });


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