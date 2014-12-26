
// function Point(x, y, dist, chromosome) {
// 	this.x = x;
// 	this.y = y;
// 	this.distance = dist;
// 	this.chromosome = chromosome;
// }

// //this is the grid model
// function Grid(pixelSize, width, height, cells) {
// 	this.pixelSize = pixelSize || 5;
// 	this.width = width || window.innerWidth - 100;
// 	this.height = height || window.innerHeight - 100;
// 	this.cells = cells || [];
// }

// Grid.prototype.setDimensions = function(dimensions) {
// 	this.width = dimensions.width;
// 	this.height = dimensions.height;
// }

// Grid.prototype.setCells = function(cells) {
// 	this.cells = [];
// 	for (var i = 0; i < cells.length; i++) {
// 		var r = Math.abs(TARGET - cells[i].decode());
// 		var x = Math.random() * r;
// 		var y = Math.sqrt(Math.abs((r*r) - (x * x)));
// 		this.cells.push(new Point(x, y, r, cells[i]));
// 	}
// }