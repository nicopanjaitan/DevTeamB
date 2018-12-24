$(document).ready(function(){

	var count = 0;
	$.ajax({
      type 			: "GET",
      url 			: "/inv_mgt/inventory/getAll",
      contentType 	: "application/json",
      dataType  	: "json",
      success: function(response){

        $.each(response.data, function (i, inventory) {   
          count = i+1;
        });

      },
      error: function(){ 
      }

    }).responseText;




});