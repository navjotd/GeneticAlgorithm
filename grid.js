
function Point(x, y, chromosome) {
	this.x = x;
	this.y = y;
	this.chromosome = chromosome;
}

//this is the grid model
function Grid(pixelSize, width, height, cells) {
	this.pixelSize = pixelSize || 5;
	this.width = width || window.innerWidth;
	this.height = height || window.innerHeight;
	this.cells = cells || [];
}

Grid.prototype.setDimensions = function(dimensions) {
	this.width = dimensions.width;
	this.height = dimensions.height;
}
