/*
    Initializes the server's database and local database. All data are fetched from the interface.js and the server. 
    The data are then compared to take over previously assigned ArUco markers and are then stored on the server and in the local memory. 
    This method is called only once per browser session
*/
function initObjects(){
    var dataAPI = getAllElements();                             //Loads data from the Smart Home system
    var dataSever;
    
    $.ajax({                                                    // Loads data from the server
        url: 'json/devices.json',
        async: false,
        data: {
            format: 'string'
        },
        error: function() {
            console.log('Fehler');
        },
        dataType: 'json',
        success: function(data) {
            dataSever = data;
        },
        type: 'GET'
    });
    if(dataAPI != null && dataSever != null){                   // If both data are present
        var objResult = findObject(dataAPI, dataSever, 'id');   // Search matching device IDs and adopt their ArUco Marker
        var jsonString = JSON.stringify(objResult) ;
        localStorage.setItem("jsonString", jsonString);         //Save the data locally in the browser
        store();                                                //Save the data on the server
    }else{
        var jsonString = JSON.stringify(dataAPI) ;
        localStorage.setItem("jsonString", jsonString);
        store();
    }
    
}

/*
    Fetches the data from the local storage, updates it, and saves it back to local storage and to the server.
    @param newVal New value for a given field
    @param itemid ID of the device to be modified
    @param field The field to be changed

*/
function updateData(newVal, itemid, field){
    var jsObject = JSON.parse( localStorage.getItem("jsonString") );
    jsObject = getObjects(jsObject, 'id', itemid, newVal , field);
    var jsonString = JSON.stringify(jsObject) ;
    localStorage.setItem("jsonString", jsonString);
    store();
    if (field != 'arucoid') setElementState(newVal);
}

/*
    Retrieves all data from the local store and returns it as a JSON object. Includes all intelligent devices.
    @return jsObject Content of the local store as a JSON object
*/
function get(){
     var jsObject = JSON.parse( localStorage.getItem("jsonString") );
    return jsObject;
}

/*
    Invokes a PHP script to store the local memory data on the server
*/
function store(){
    $.ajax({
        type : "POST",
        url : "php/ajax.php",
        data : {
            json : localStorage.getItem("jsonString")
        },
        success: function(data) {
            //console.log(data);
        },
    });
}

/*
    Function to find the same key-value pair in 2 different JSON objects.
    @param obj JSON - object one
    @param obj2 JSON - object two
    @param key The field to be found
*/
function findObject(obj,obj2, key) {

    var objArray = createObjektArray(obj);
    var objArray2 = createObjektArray(obj2);

    for (var i = 0; i < objArray.length; i++) {
        for (var j = 0; j < objArray.length; j++) {
            if (objArray[i][key] == objArray2[j][key]) {
                obj = getObjects(obj, key, objArray2[j][key], objArray2[j]['arucoid'] , 'arucoid');
            }
        }   
    }
    return obj;
}

/*
    Recursive function that recursively runs the given JSON object of all intelligent devices to write the value to be changed to its intended location.
    @param obj JSON - object of all intelligent devices
    @param key The field to be found
    @param val The value of the field to be found
    @param newVal New value for the given field
    @param changeVal The field to be changed
*/
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

/*
    Generates from an JSON object with all intelligent devices, an array of individual objects of the devices
    @param o Json object of the intelligent devices
    @return devices All devices as individual objects in an array
*/
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

/*
    Retrieves all devices as JSON from memory and returns them as objects
    @return devices All devices as individual objects in an array
*/
function getAllDevices(){
        var devices = new Array;
        var jsObject = get();
        var count = 0;
                
        devices = createObjektArray(jsObject, count);
		return devices;
    }
