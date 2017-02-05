/*
	Dummy Interface.js, which loads all data from a prefabricated JSON file and returns it to the application. 
	Here would be a real API call to a REST interface to a Smart Home system.
*/
function getAllElements()
{
    var myObject = {
                
                Lamp: [
                ],
                Heater: [  
                ] 
            };
    var request = $.ajax
    ({
        type       : "GET",
        url        : "http://192.168.178.78:8080/rest/items/Lights",
        async      : false,
        dataType   : 'json'
    });

    request.done( function(data) 
    { 
        var times;
        console.log( "Loaded OpenHab" );
        console.log(data);
        if (data['members'].length == 'undefined') {
            times = 1;
        }else{
            times = data['members'].length;
        }
        for (var i = 0 ; i < times ; i++) {
    
            item = {}
            item ["id"] = i+1;
            item ["name"] = data['members'][i]['name'];
            item ["arucoid"] = '';
            if(data['members'][i]['type'] == 'SwitchItem'){
                item ["state"] = data['members'][i]['state'];
                item ["type"] = 'lamp';
                item ["color"] = '';
                item ["dim"] = '100';
                item ["where"] = 'Flur';
            }
            if(data['members'][i]['type'] == 'DimmerItem'){
                item ["dim"] = data['members'][i]['state'];
                if(data['members'][i]['state'] > 0){
                    item ["state"] = 'on';
                }else{
                    item ["state"] = 'off';
                }
                item ["color"] = '';
                item ["type"] = 'led';
                if (data['members'][i]['name'].includes('Kitchen')){
                    item ["where"] = 'Küche';
                }
                if (data['members'][i]['name'].includes('Living')){
                    item ["where"] = 'Wohnzimmer';
                }
            }

            //TODO Colorpicker
            /*if(data['members'][i]['type'] == 'ColorItem'){
                item ["dim"] = '100';
                if(data['members'][i]['state'] > 0){
                    item ["state"] = 'on';
                }else{
                    item ["state"] = 'off';
                }
                
                item ["color"] = '';
                item ["type"] = 'led';
            }*/

            myObject['Lamp'].push(item);
        }
        
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });

    return myObject;
}


function setElementState( txtNewState )
{
    var parameter;
    if(txtNewState == 'on'){
        parameter = 'ON';
    }
    else{
        parameter= 'OFF';
    }
    var request = $.ajax
    ({
        type       : "POST",
        url        : "http://192.168.178.78:8080/rest/items/Light_Corridor",
        data       : parameter, 
        headers    : { "Content-Type": "text/plain" }
    });

    request.done( function(data) 
    { 
        console.log( data );
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}

