/*
    Initialisiert die lokale Datenbank und die Datenbank des Servers. Es werden alle Daten von der Interface.js
    geholt und abgespeichert. Diese Methode wird nur einmal pro Browser Session aufgerufen
*/
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
}

/*
    Holt die Daten aus dem lokalen Speicher, aktualisiert sie und speichert sie wieder im lokalen Speicher und auf dem Server ab.
    @param newVal Neuer Wert für ein gegebenes Feld
    @param itemid ID des zu verändernden Gerätes
    @param field Das zu verändernde Feld

*/
function updateData(newVal, itemid, field){
    var jsObject = JSON.parse( localStorage.getItem("jsonString") );
    jsObject = getObjects(jsObject, 'id', itemid, newVal , field);
    var jsonString = JSON.stringify(jsObject) ;
    localStorage.setItem("jsonString", jsonString);
    store();
}

/*
    Holt alle Daten aus dem lokalen Speicher und gibt sie als JSON-Objekt zurück. Beinhaltet alle intelligenten 
    Geräte.
    @return jsObject Inhalt des Lokalen Speichers als JSON Objekt
*/
function get(){
     var jsObject = JSON.parse( localStorage.getItem("jsonString") );
    return jsObject;
}

/*
    Ruft ein PHP-Script auf, um die Daten des lokalen Speichers auf dem Server zu speichern
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
    Rekursive Funktion die das gegebene JSON-Objekt alle intelligenten Geräte rekursiv durchläuft, um den zu ändernden Wert
    an seine dafür vorgesehene Stelle zu schreiben.
    @param obj JSON - Objekt aller intelligenten Geräte
    @param key Das zu findende Feld
    @param val Der gesuchte Wert des zu findenden Feldes
    @param newVal Neuer Wert für ein gegebenes Feld
    @param changeVal Das zu verändernde Feld
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
    Erzeugt aus einem JSON-Objekt mit allen intelligenten Geräten ein Array aus einzelnen Objekten der Devices
    @param o Json-Objekt der intelligenten Geräte
    @return devices Alle Devices als einzelne Objekte in einem Array
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
    Holt alle Devices als JSON aus dem Speicher und gibt diese als Objekte zurück
    @return devices Alle Devices als einzelne Objekte in einem Array
*/
function getAllDevices(){
        var devices = new Array;
        var jsObject = get();
        var count = 0;
                
        devices = createObjektArray(jsObject, count);
		return devices;
    }
