/*
	Dummy Interface.js, which loads all data from a prefabricated JSON file and returns it to the application. 
	Here would be a real API call to a REST interface to a Smart Home system.
*/
function getAllElements(){
	var result;
	$.ajax({
        url: 'json/exampleJSON.json',
        async: false,
        data: {
            format: 'string'
        },
        error: function() {
            console.log('Fehler');
        },
        dataType: 'json',
        success: function(data) {
        	result= data;
        },
        type: 'GET'
    });
    return result;
}

function setElementState(){
	
}