function setSettings() {
	var popSize = Number(document.getElementById('popSize').value);
	var target = Number(document.getElementById('target').value);
	var mutation = Number(document.getElementById('mutation').value);

	if (popSize % 2 === 0)
		POP_SIZE = popSize;

	TARGET = target;
	MUTATION_RATE = mutation;
}

function hideMenu() {
	document.getElementById('settings').className = "hide";
}

function showMenu() {
	document.getElementById('settings').className = "show";
}

function displayResults(result) {
	var results = document.getElementById('results');
	results.className = "show";
	results.innerHTML = result;
	results.innerHTML += '<br> Press Enter to retry'
}

function hideResults() {
	document.getElementById('results').className = "hide";
}

hideResults();

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
			debugger;
			displayResults(p[p.matches[0]].sequence);
		}
		pointPainter.clear();
		pointPainter.paintPoints(p);
		// var vals = [];
		// p.forEach(function(item) { vals.push(item.decode()); })
		// vals.sort(function(a,b){ return (a < b) });
		// console.log(vals);
		p.evolve();
		counter++;
	}, 100);
}

var button =  document.getElementById('button');

button.onclick = function(e) {
	setSettings();
	hideMenu();
	start();
}

document.onkeyup = function(e) {
	e.wich = e.wich || e.keyCode;
	if (e.wich === 13 && document.getElementById('results').className === "show") {
		hideResults();
		showMenu()
	}
}
