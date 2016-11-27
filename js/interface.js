/*
	Dummy Interface.js, die alle Daten aus einer vorgefertigten JSON file läd und an die Applikation zurückgibt.
	Hier würde ein richtiger API Call an eine REST Schnittstelle zu einem Smarthome System stehen.
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