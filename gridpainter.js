var redToGreen = ["FF0000",
"FF1100",
"FF2200",
"FF3300",
"FF4400",
"FF5500",
"FF6600",
"FF7700",
"FF8800",
"FF9900",
"FFAA00",
"FFBB00",
"FFCC00",
"FFDD00",
"FFEE00",
"FFFF00",
"EEFF00",
"DDFF00",
"CCFF00",
"BBFF00",
"AAFF00",
"99FF00",
"88FF00",
"77FF00",
"66FF00",
"55FF00",
"44FF00",
"33FF00",
"22FF00",
"11FF00",
"00FF00"]


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
		if (r > Math.min(this.node.width/2 - 50, this.node.width/2 - 50)) 
			r = Math.min(this.node.width/2 - 50, this.node.width/2 - 50);
		this.context.fillStyle = getPointColour(r);
		var x = Math.random() * r * rflctx;
		var y = Math.sqrt(Math.abs((r*r) - (x * x))) * rflcty;
		//console.log("val: " + points[i].decode() + " r: " + r + " x: " + x + "y: " + y);
		this.context.fillRect(originx + (x * 2), originy + (y * 2), 2, 2);
	}
}

function getPointColour(r) {
	//debugger;
	if (r < 31)
		return '#' + redToGreen[Math.floor(r)];
	else
		return '#333';
}

