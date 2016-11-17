function initObjects(){

    $.ajax({
   url: 'json/devices.json',
   data: {
      format: 'string'
   },
   error: function() {
        console.log('Fehler');
   },
   dataType: 'json',
   success: function(data) {
        var jsonString = JSON.stringify(data) ;

        localStorage.setItem("jsonString", jsonString);
   },
   type: 'GET'
});

/*
    console.log('test2');
    jQuery.get('json/devices.json', function(data) {
        console.log('test3');

        var jsonString = JSON.stringify(data) ;

        console.log(data);

        localStorage.setItem("jsonString", jsonString);

        console.log(JSON.parse( localStorage.getItem("jsonString") ));
        console.log(jsonString);
  });*/
}


function updateData(newVal, itemid, field){
    var jsObject = JSON.parse( localStorage.getItem("jsonString") );
    jsObject = getObjects(jsObject, 'id', itemid, newVal , field);
    var jsonString = JSON.stringify(jsObject) ;
    localStorage.setItem("jsonString", jsonString);
    store();
}

function get(){
     var jsObject = JSON.parse( localStorage.getItem("jsonString") );
    return jsObject;
}


function store(){
    $.ajax({
    type : "POST",
    url : "php/ajax.php",
    data : {
        json : localStorage.getItem("jsonString")
    }
});
   
    //console.log(localStorage.getItem("jsonString"));
}

function getObjects(obj, key, val, newVal , changeVal) {
    var newValue = newVal;
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val, newValue, changeVal));
        } else if (i == key && obj[key] == val) {
            obj[changeVal] = newValue;
        }
    }
    return obj;
}

function createObjektArray(o) {
   var devices = new Array;
   var count = 0; 
    for (i in o) {
        if (!!o[i] && typeof(o[i])=="object") {
            for (var j = 0; j < o[i].length ; j++) {
                
                if( o[i][j].type == 'lamp'){
                
                    var singleDevice = new Lamp(o[i][j].id, o[i][j].type , o[i][j].name , o[i][j].arucoid ,o[i][j].dim, o[i][j].color, o[i][j].state, ['An', 'Aus'], o[i][j].where);
                    devices[count]= singleDevice;
                    count++;
                }else
                if( o[i][j].type == 'led'){
                
                    var singleDevice = new Lamp(o[i][j].id, o[i][j].type , o[i][j].name , o[i][j].arucoid ,o[i][j].dim, o[i][j].color, o[i][j].state, ['An', 'Aus', 'Dimmen', 'Farbe'], o[i][j].where);
                    devices[count]= singleDevice;
                    count++;
                }else
                if( o[i][j].type == 'heater'){
                    var singleDevice = new Heater(o[i][j].id, o[i][j].type , o[i][j].name , o[i][j].arucoid ,o[i][j].temperature, o[i][j].state, ['An', 'Aus', 'Temperatur', 'Wärmer', 'Kälter'], o[i][j].where);
                    devices[count]= singleDevice;
                    count++;
                }
            }
        }
    }
    //console.log(devices);
    return devices;
}  


function getAllDevices(){
        var devices = new Array;
        var jsObject = get();
        var count = 0;
                
        devices = createObjektArray(jsObject, count);
		return devices;
    }
