

var Lamp = function (id, type, name, arucoid, dim, color, state, functions) {
  this.id = id;
  this.type = type;
  this.name = name;
  this.arucoid = arucoid;
  this.dim = dim;
  this.color = color;
  this.state = state;
  this.functions = functions;
};

Lamp.prototype.setID = function(id) {
  this.id = id;
};

var Heater = function (id, type, name, arucoid, temperature, state, functions) {
  this.id = id;
  this.type = type;
  this.name = name;
  this.arucoid = arucoid;
  this.temperature = temperature;
  this.state = state;
  this.functions = functions;
};

Heater.prototype.setID = function(id) {
  this.id = id;
};
