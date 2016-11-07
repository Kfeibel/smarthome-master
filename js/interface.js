function getAllDevices(){
    	
    	var device1 = new Device('Stehlampe Wohnzimmer', ['An', 'Aus', 'Dimmen', 'Farbe']);
    	device1.setID(34);
    	var device2 = new Device('Lampe Bad', ['An', 'Aus', 'Dimmen']);
    	device2.setID(555);
    	var device3 = new Device('Heizung Küche', ['Wärmer', 'Kälter', 'Temperatur']);
    	device3.setID(1023);
		var device4 = new Device('Heizung Wohnzimmer', ['Wärmer', 'Kälter', 'Temperatur']);
		
	
		return [device1,device2,device3,device4];
    }
