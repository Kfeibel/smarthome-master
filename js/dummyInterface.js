function getAllDummyElements(){
  $.ajax({
    url: 'json/exampleJSON.json',
    data: {
      format: 'string'
    },
    error: function() {
      console.log('Fehler');
    },
    dataType: 'json',
    success: function(data) {
      console.log('Loaded Dummy');
      fillLocalStorage(data);
        
    },
    type: 'GET'
  });
}
