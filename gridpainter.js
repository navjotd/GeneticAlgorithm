
function GridPainter(canvasNode, grid) {
	this.node = canvasNode;
	this.node.width = grid.width - 100;
	this.node.height = grid.height - 100;
	this.grid = grid;
	this.context = this.node.getContext("2d");
	this.context.strokeStyle = '#111';
}

GridPainter.prototype.paintGrid = function() {
	for (var i = 0.5; i < this.grid.width/this.grid.pixelSize; i++) {
		var startPoint = this.grid.pixelSize*i;
		console.log(startPoint);
		this.context.moveTo(startPoint, 0);
		this.context.lineTo(startPoint, this.grid.height);
	}

	for (var i = 0.5; i < this.grid.height/this.grid.pixelSize; i++) {
		var startPoint = this.grid.pixelSize*i;
		this.context.moveTo(0, startPoint);
		this.context.lineTo(this.grid.width, startPoint);
	}

	this.context.stroke();
}

GridPainter.prototype.drawCircle = function() {
	this.context.fillStyle = 'white';
	var x = 0;
	var r = 20;
	var originx = Math.floor(Math.floor(this.grid.width/2)/5) * 5 + 2.5;
	var originy = Math.floor(Math.floor(this.grid.height/2)/5) * 5 + 2.5;

	while(x++ < r) {
		var y = Math.sqrt(Math.abs((r*r) - (x * x)));
		console.log(originx + (5 * x), originy + (5 * y));
		this.context.fillRect(originx + (5 * x), originy + (5 * y), 5, 5);
	}
}