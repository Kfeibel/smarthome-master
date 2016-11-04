

var Device = function (name, functions) {
  this.name = name;
  this.id = -1;
  this.functions = functions;
};

Device.prototype.setID = function(id) {
  this.id = id;
};
