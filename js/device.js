/*
'Classes' of intelligent devices and their specific functions. Currently for Dummy Component Lamp and Heater
*/

var Lamp = function (id, type, name, arucoid, dim, color, state, functions,where) {
  this.id = id;
  this.type = type;
  this.name = name;
  this.arucoid = arucoid;
  this.dim = dim;
  this.color = color;
  this.state = state;
  this.functions = functions;
  this.where = where;
};

Lamp.prototype.setID = function(id) {
  this.id = id;
};

var Heater = function (id, type, name, arucoid, temperature, state, functions, where) {
  this.id = id;
  this.type = type;
  this.name = name;
  this.arucoid = arucoid;
  this.temperature = temperature;
  this.state = state;
  this.functions = functions;
  this.where = where;
};

Heater.prototype.setID = function(id) {
  this.id = id;
};
