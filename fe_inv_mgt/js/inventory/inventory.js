/* =================================  GENERAL  ================================== */

$(function(){
  $("#header").load("template/navbar.html"); 
  $("#sidebar").load("template/sidebar.html");
  $("#footer").load("template/footer.html"); 

});

/* ==============================  END OF GENERAL  =============================== */

$(document).ready(function(){
    $("#inv_form").submit(function(){
        request_inventory();
    });

    var id = location.href.split("?")[1];

    //convert form data to json
    function formToJson(form) {
    	var obj = {};
    	var elements = form.querySelectorAll( "input, select, textarea" );
    	 
    	for( var i = 0; i < elements.length; ++i ) {
    	    var element = elements[i];
    	    var key = element.name;
    	    var value = element.value;

    	    if( key ) {
    	        obj[key] = value;
    	    }
    	} 

    	return JSON.stringify( obj );
    }

    function getData(_url){

    	var data = $.parseJSON(
    		$.ajax({
        		url:  _url,
            contentType: "application/json",
        		dataType: "json", 
        		async: false,
            success:function(msg){
              alert('success');
            },
            error:function(msg){
              alert('error create data');
            }
        	}).responseText); // will wait until you get a response from the ajax request.
    	
    	return data;
    }

    function loadToForm(){
    	$("#form_upd").load("form_upd.html");

    	var data = $.parseJSON(
    		$.ajax({
        		url:  '/inv_mgt/inventory/getById/'+ id,
        		dataType: "json", 
        		async: false
        	}).responseText); // will wait until you get a response from the ajax request.
     
        writeToForm('#req_inv', JSON.stringify(data));
     	
    }

    function writeToForm(form, data) {  
    	var form = document.getElementById('req_inv');
    	
    	var dataJson = JSON.parse(data, function (key, value) {
     	var formInput = $('[name='+ key +']', form);  
     
        switch(formInput.prop("type")) { 
            case "radio": case "checkbox":   
                formInput.each(function() {
                    if($(this).attr('value') == value) $(this).attr("checked",value);
                });   
                break;  
            default:
                formInput.val(value); 
            }  
        }); 
     	//form.addEventListener('submit', upd_inventory());
    }


    /* =============================  END OF GENERAL  =============================== */





    /* =================================  INVENTORY  ================================== */
    function request_inventory(){
    	  var form = document.getElementById('inv_form');
        var jsonData = formToJson( form );

        alert('in: req');

        $.ajax({
          type : "POST",
          url  : "/inv_mgt/inventory/create",
          contentType: "application/json",
          dataType: "json",
          data : jsonData,
          success:function(msg){
          	alert('success');
          },
          error:function(msg){
            alert('error create data');
          }
        });

        alert('out: req');
    }

    function viewAll_inventory(_url){
    	var data = getData(_url);
    	var inv_data = '';

    	$.each(data, function (i, value) { 
            inv_data += 
              '<tr>'
              	+'<td>' + (i+1) + '</td>'
              	+'<td><a href="/inventory/view.html?'+ (value._id)+'"">' + value.name + '</a></td>'
              	+'<td>' + value.detail + '</td>'
              	+'<td>' + value.price + '</td>'
              	+'<td>' + value.stock + '</td>'
              	+'<td>' + value.image + '</td>' 
              	+'<td> <button onclick="'testButton(value._id)'">Upd</button> </td>' +
              '</tr>'; 
        }).responseText;

        
        $('#inv_table').append(inv_data);
    }

    function testButton(id){
    	alert(id);

    }
    function viewById(_url){
    	$.ajax({
     		type:'GET',
     		url:'/inv_mgt/inventory/getById/'+id,
     		
    	   	success:function(msg){
    	   		inv_detail = msg.name + ' - ' + msg.detail + ' - ' + msg.price + ' - ' +  msg.stock; 
    	      	$('#viewDetail').append(inv_detail);
    	   	}
    	}); 
    }

    function upd_inventory(){   
    	var form = document.getElementById('req_inv');
        var jsonData = formToJson( form );

        alert('in: upd');

        $.ajax({
          type : "PUT",
          url  : "/inv_mgt/inventory/updateById/"+id,
          data : jsonData,
          contentType: "application/json"
        });

        alert('out: upd');
    }

    function del_inventory(){

      	$.ajax({
     		type:'DELETE',
     		url:'/inv_mgt/inventory/deleteById/'+id,
    	   	success:function(msg){
    	   		if (msg == 1) { 
    	   			alert('successful to delete');
    	   			window.location="/inventory";
    	   		}
    	   		else{ 
    	   			alert('failed to delete');
    	   			window.location="/inventory";
    	   		}
    	   	}
    	}); 
    }

}

/* =============================  END OF INVENTORY  =============================== */










/* =================================  REQUEST  ================================== */
 
/* =============================  END OF REQUEST  =============================== */





/* =================================  USER  ================================== */
 
/* =============================  END OF USER  =============================== */





/* =================================  EMPLOYEE  ================================== */
 
/* =============================  END OF EMPLOYEE  =============================== */





/* =================================  SUPERVISOR  ================================== */
 
/* =============================  END OF SUPERVISOR  =============================== */




/* =================================  EMPLOYEE  ================================== */
 
/* =============================  END OF EMPLOYEE  =============================== */



