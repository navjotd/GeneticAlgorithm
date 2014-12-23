
var grid = new Grid();
var gridPainter = new GridPainter(document.getElementById('grid'), grid);

gridPainter.paintGrid();
gridPainter.drawCircle();

function start() {
	counter = 0;
	var p = new Population();
	p.initialize(POP_SIZE);
	p.setFitnessScores();

	while(p.matches.length === 0) {
		p.evolve();
		counter++;
		// var vals = [];
		// p.forEach(function(item) { vals.push(item.decode()); })
		// vals.sort(function(a,b){ return (a < b) });
		// console.log(vals);
	}

	if (p.matches.length > 0) {
		console.log(counter);
		return p[p.matches[0]];
	}
	else 
		return "not found";
}