

var Device = function (name, functions, state) {
  this.name = name;
  this.id = -1;
  this.functions = functions;
  this.state = state;
};

Device.prototype.setID = function(id) {
  this.id = id;
};
