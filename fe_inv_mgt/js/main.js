$(function(){
	$("#header").load("template/navbar.html"); 
	$("#sidebar").load("template/sidebar.html");
	$("#content").load("template/content.html");
	$("#footer").load("template/footer.html"); 
});

//convert form data to json
function formToJson( form ) {
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

