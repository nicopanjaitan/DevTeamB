$(document).ready(function(){

	$.get("/template/sidebar.html", function (data) {
      $("aside").append(data);

      if(getRoles() == "employee"){
      	  $("#dashboardA, #dashboardS, #inventoryA, #requestA, #employeeA, #supervisorA, #userA").html('');
      }
      else if(getRoles() == "supervisor"){
      	  $("#dashboardA, #dashboardE, #inventoryA, #inventoryE, #requestA, #employeeA, #supervisorA, #userA").html('');
      }
      else if(getRoles() == "admin"){
      	  $("#dashboardE, #dashboardS, #inventoryE").html('');
      }
  	}); 

  	$.get("/template/navbar.html", function (data) {
      $("header").append(data);

      if(getLogin() == "true"){
      	  $("#dashboardA, #dashboardS, #inventoryA, #requestA, #employeeA, #supervisorA, #userA").html('');
      }
      else if(getLogin() == "false"){
      	  $("#dashboardA, #dashboardE, #inventoryA, #inventoryE, #requestA, #employeeA, #supervisorA, #userA").html('');
      }
  	}); 

	// if(location.href != "http://localhost/login.html"){
	// 	if(getLogin() == "false"){
	// 		location.href = "/login.html";
	// 	}
	// }
	

	  
	/*  ================= LOGIN =====================*/
    function mainRedirect() { 
    	window.location.replace("/inventory/inventoryByEmployee.html"); 
    }  

    function setCookie(userID_, role) { 
	  	document.cookie = 	"userlogin" + "=" + "true" + ";";
	  	document.cookie = 	"userID" + "=" + userID_ + ";";
	  	document.cookie =   "roles" + "=" + role + ";"; 
	}

	function logout(){
		document.cookie = "userlogin" + "=" + "false" + ";";
	}	 

	function getLogin(){
		return document.cookie.split('userlogin=')[1].split(';')[0];
	}

	function getUserID(){ 
		return document.cookie.split('userID=')[1].split(';')[0];
	}  

	function getRoles(){ 
		return document.cookie.split('roles=')[1].split(';')[0];
	}   
  
	// setCookie("emp_20190101122622", "employee");
	// alert(document.cookie);

	/* ================================================= UPDATE DATA INVENTORY ===========================================================*/
	function ConvertFormToJSON(form){
	    var array = jQuery(form).serializeArray();
	    var json = {};
	    
	    jQuery.each(array, function() {
	        json[this.name] = this.value || '';
	    });
	    
	    return json;
	}

	/* ================================================= LOGIN ===========================================================*/
	$("#loginForm").submit(function(){
       validateLogin();
  	});
   
	function validateLogin(){

      var form = document.getElementById('loginForm'); 
	  var dataForm = ConvertFormToJSON(form);
	 
	  if (dataForm['role'] == 'employee') {
   		  checkEmployee(JSON.stringify(dataForm));
	  } 
	  else{
	  	  checkSupervisor(JSON.stringify(dataForm));
	  }

  	}

  	function checkEmployee(data_json){
  		$.ajax({
          type         : "POST",
          data         : data_json,
          url          : "/inv_mgt/employee/login",
          contentType  : "application/json",
          dataType     : "json",
          success: function(response){ 
          	  console.log(response);
	          if(response.code == 200){
	          	setCookie(response.data.employeeID, dataForm['role']);
	          	location.href = "/inventory/inventoryByEmployee.html";
	          }
	          else{
	            alert('Login failed'); 
	          }
	  	  },
	  	  error : function(response){ 
	  	  	console.log(response);
	  	  	alert('Internal error'); 
	      }
      	}).responseText;
  	}

  	function checkSupervisor(data_json){
  		$.ajax({
          type         : "POST",
          data         : data_json,
          url          : "/inv_mgt/supervisor/login",
          contentType  : "application/json",
          dataType     : "json",
          success: function(response){ 
          	  console.log(response);
	          if(response.code == 200){
	          	setCookie(response.data.supervisorID, dataForm['role']);
	          	location.href = "/inventory/inventoryByEmployee.html";
	          }
	          else{
	            alert('Login failed'); 
	          }
	  	  },
	  	  error : function(response){ 
	  	  	console.log(response);
	  	  	alert('Internal error'); 
	      }
      	}).responseText;
  	}

	 
});