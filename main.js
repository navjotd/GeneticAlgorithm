var gridPainter = new GridPainter(document.getElementById('grid'), 5);
var pointPainter = new PointPainter(document.getElementById('points'));

window.onresize = function() {
	gridPainter.clear();
	gridPainter.updateSize();
	gridPainter.paintGrid();
	pointPainter.clear();
	pointPainter.updateSize();
	pointPainter.paintPoints();
}

gridPainter.paintGrid();

function start() {
	var counter = 0;
	var p = new Population();
	p.initialize(POP_SIZE);
	p.setFitnessScores();

	// while(p.matches.length === 0) {
	// 	p.evolve();
	// 	counter++;
	// 	gridPainter.paintPoints(true);
	// 	gridPainter.paintGrid();
	// 	grid.setCells(p);
	// 	gridPainter.paintPoints();
	// 	debugger;
	// 	var vals = [];
	// 	p.forEach(function(item) { vals.push(item.decode()); })
	// 	vals.sort(function(a,b){ return (a < b) });
	// 	console.log(vals);
	// }

	var id = setInterval(function(){
		if (p.matches.length > 0) {
			clearInterval(id);
			console.log(counter);
			console.log(p.matches[0]);
		}
		pointPainter.clear();
		pointPainter.paintPoints(p);
		var vals = [];
		p.forEach(function(item) { vals.push(item.decode()); })
		vals.sort(function(a,b){ return (a < b) });
		console.log(vals);
		p.evolve();
		counter++;
	}, 500);
}

start();