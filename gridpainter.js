
function GridPainter(canvasNode, pixelSize) {
	this.node = canvasNode;
	this.pixelSize = pixelSize;
	this.node.width = window.innerWidth - 100;
	this.node.height = window.innerHeight - 100;
	this.context = this.node.getContext("2d");
	this.context.strokeStyle = '#070707';
}

GridPainter.prototype.updateSize = function() {
	this.node.width = window.innerWidth - 100;
	this.node.height = window.innerHeight - 100;
	this.context = this.node.getContext("2d");
	this.context.strokeStyle = '#070707';
}

GridPainter.prototype.paintGrid = function() {

	for (var i = 0.5; i < this.node.width/this.pixelSize; i++) {
		var startPoint = this.pixelSize*i;
		this.context.moveTo(startPoint, 0);
		this.context.lineTo(startPoint, this.node.height);
	}

	for (var i = 0.5; i < this.node.height/this.pixelSize; i++) {
		var startPoint = this.pixelSize*i;
		this.context.moveTo(0, startPoint);
		this.context.lineTo(this.node.width, startPoint);
	}

	this.context.stroke();
}

GridPainter.prototype.clear = function() {
	this.context.clearRect(0,0,this.node.width, this.node.height);
}

function PointPainter(canvasNode) {
	this.node = canvasNode;
	this.node.width = window.innerWidth - 100;
	this.node.height = window.innerHeight - 100;
	this.context = this.node.getContext("2d");
	this.points = [];
}

PointPainter.prototype.updateSize = function() {
	this.node.width = window.innerWidth - 100;
	this.node.height = window.innerHeight - 100;
	this.context = this.node.getContext("2d");
}

PointPainter.prototype.clear = function() {
	this.context.clearRect(0,0,this.node.width, this.node.height);
}

PointPainter.prototype.paintPoints = function(points) {
	if (!points) 
		var points = this.points;
	else
		this.points = points;
	this.context.fillStyle = "white";
	var originx = this.node.width/2;
	var originy = this.node.height/2;

	for (var i = 0; i < points.length; i++) {
		var rflctx = (Math.floor(Math.random() * 2))? 1: -1;
		var rflcty = (Math.floor(Math.random() * 2))? 1: -1;
		var r = Math.abs(TARGET - points[i].decode());
		var x = Math.random() * r * rflctx;
		var y = Math.sqrt(Math.abs((r*r) - (x * x))) * rflcty;
		console.log("val: " + points[i].decode() + " r: " + r + " x: " + x + "y: " + y);
		this.context.fillRect(originx + (x * 2), originy + (y * 2), 2, 2);
	}
}	