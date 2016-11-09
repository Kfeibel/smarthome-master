function initObjects(){
    console.log('test2');
    jQuery.get('json/devices.json', function(data) {
        console.log('test3');
        var jsonString = JSON.stringify(data) ;
        console.log(data);
        

        localStorage.setItem("jsonString", jsonString);
        console.log(JSON.parse( localStorage.getItem("jsonString") ));
    //console.log(jsonString);
  });
    console.log('test4');
}


function update(){
     localStorage.getItem("jsonString");
}


function get(){
     var jsObject = JSON.parse( localStorage.getItem("jsonString") );

    return jsObject;
}


function store(){
    var data = new FormData();
    data.append("data" , localStorage.getItem("jsonString"));
    var xhr = new XMLHttpRequest(); 
    xhr.open( 'post', 'json/devices.json', true );
    xhr.send(data);
}

function createObjektArray(o) {
   var devices = new Array;
   var count = 0; 
    for (i in o) {
        if (!!o[i] && typeof(o[i])=="object") {
            for (var j = 0; j < o[i].length ; j++) {
                
                if( o[i][j].type == 'lamp'){
                
                    var singleDevice = new Lamp(o[i][j].id, o[i][j].type , o[i][j].name , o[i][j].arucoid ,o[i][j].dim, o[i][j].color, o[i][j].state, ['An', 'Aus']);
                    devices[count]= singleDevice;
                    count++;
                }else
                if( o[i][j].type == 'led'){
                
                    var singleDevice = new Lamp(o[i][j].id, o[i][j].type , o[i][j].name , o[i][j].arucoid ,o[i][j].dim, o[i][j].color, o[i][j].state, ['An', 'Aus', 'Dimmen', 'Farbe']);
                    devices[count]= singleDevice;
                    count++;
                }else
                if( o[i][j].type == 'heater'){
                    var singleDevice = new Heater(o[i][j].id, o[i][j].type , o[i][j].name , o[i][j].arucoid ,o[i][j].temperature, o[i][j].state, ['An', 'Aus', 'Temperatur', 'Wärmer', 'Kälter']);
                    devices[count]= singleDevice;
                    count++;
                }
            }
        }
    }
    console.log(devices);
    return devices;
}  


function getAllDevices(){
        var devices = new Array;
        var jsObject = get();
        var count = 0;
        devices = createObjektArray(jsObject, count);
        
		return devices;
    }
