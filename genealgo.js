// create a large population of random chromosomes
// convert digit to binary (4 bit binary number)
var POP_SIZE = 100;
var GENE_LENGTH = 4;
var CHROMOSOME_LENGTH = 300;
var TARGET = 54;

var encoding = {
	"0000": 0,
	"0001": 1,
	"0010": 2,
	"0011": 3,
	"0100": 4,
	"0101": 5,
	"0110": 6,
	"0111": 7,
	"1000": 8,
	"1001": 9,
	"1010": "+",
	"1011": "-",
	"1100": "*",
	"1101": "/"
};

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

function Population() {
	this.matches = [];
	this.totalFitness = 0;
}

Population.prototype = Object.create(Array.prototype);

Population.prototype.initialize = function(POP_SIZE) {
	for (var i = 0; i < POP_SIZE; i++) {
		this.push(new Chromosome());
	}
}

Population.prototype.setFitnessScores = function() {
	this.totalFitness = 0;
	for (var i = 0; i < this.length; i++) {
		var diff = Math.abs(TARGET - this[i].decode());
		if (diff === 0) {
			this[i].fitness = Infinity;
			this.matches.push(i);
			continue;
		}
		this[i].fitness = 1/diff;
		this.totalFitness += this[i].fitness;
	}
}

function crossOver(bits1, bits2) {
	var result = {};
	var index = Math.floor(Math.random() * CHROMOSOME_LENGTH/GENE_LENGTH + 1) * 4;
	result.newBits1 = bits1.substring(0, index + 1) + bits2.substring(index + 1, bits2.length);
	result.newBits2 = bits2.substring(0, index + 1) + bits1.substring(index + 1, bits1.length);
	return result;
}

Population.prototype.rouletteSelection = function() {
	var spin = (Math.random() * (this.totalFitness));
	var fitnessSoFar = 0;
	for (var i = 0; i < this.length; i++) {
		fitnessSoFar += this[i].fitness;
		if (fitnessSoFar >= spin) {
			return i;
		}
	}
	
	console.log("hello");
	return null;
}

Population.prototype.evolve = function() {
	newPop = [];
	while (newPop.length < this.length) {
		p = this.rouletteSelection();
		p2 = this.rouletteSelection();

		var chromosome1 = this[p];
		var chromosome2 = this[p2];
		
		if (Math.floor(Math.random() * 10) < 6) {
			//console.log("CROSSOVER ************************************************");
			var result = crossOver(chromosome1.bits, chromosome2.bits);

			chromosome1 = new Chromosome(result.newBits1);
			chromosome2 = new Chromosome(result.newBits2);
		}

		chromosome1.mutate();
		chromosome2.mutate();

		newPop.push(chromosome1);
		newPop.push(chromosome2);
	}
	
	for (var i = 0; i < this.length; i++) {
		this[i] = newPop[i];
	}

	this.setFitnessScores();

	// var vals = [];
	// newPop.forEach(function(item) { vals.push(item.decode()); })
	// vals.sort(function(a,b){ return (a < b) });
	// console.log('new Pop *************************');
	// console.log(vals);
}

function genRandomBinary(length) {
	var bits = "";
	for (var i = 0; i < length; i++) {
		var randomBit = Math.floor(Math.random() * 2) + "";
		bits += randomBit;
	}
	return bits;
}

function isOperation(str) {
	return (str === '+' || str === '-' || str === "*" || str === "/");
}

function evaluateStack(stack) {
	if (stack.length === 0) return undefined;
	var result = stack[0];
	for (var i = 1; i < stack.length; i++) {
		if (isOperation(stack[i])) {
			if (stack[i] === '+') {
				result += stack[i+1];
				i++;
			} else if (stack[i] === '-') {
				result -= stack[i+1];
				i++;
			} else if (stack[i] === '*') {
				result *= stack[i+1];
				i++
			} else if (stack[i] === '/') {
				result /= stack[i+1];
				i++;
			}
		}
	}

	return result;
}

function Chromosome(bits) {
	this.bits = bits || genRandomBinary(CHROMOSOME_LENGTH);
	this.fitness = 0;
	this.sequence = "";
}

Chromosome.prototype.decode = function() {
	var stack = [];
	var state = "num";
	var length = CHROMOSOME_LENGTH/GENE_LENGTH;
	for (var i = 0; i < length - 1; i++) {
		var index = i * GENE_LENGTH;
		var binaryGene = this.bits.substring(index, index + 4);
		var decodedResult = encoding[binaryGene];
		if (decodedResult) {
			if (state === "op" && isOperation(decodedResult)) {
				stack.push(decodedResult);
				state = "num";
			} else if (state === "num" && !isOperation(decodedResult)) {
				stack.push(decodedResult);
				state = "op";
			}
		}
	}

	if (isOperation(stack[stack.length-1])) stack.pop();
	this.sequence = stack.join(" ");
	return evaluateStack(stack);
}


Chromosome.prototype.mutate = function() {
	var str = this.bits;
	// apparently math.random is pretty uniform, so getting 5 has probability of 1/1000
	for (var i = 0; i < this.bits.length; i++) {
		var toss = Math.floor(Math.random() * 1000);
		if (toss === 5) {
			//console.log("MUTATION ************************************************");
			str = str.replaceAt(i, String(1 - Number(str[i]))); //this flips the bit;s
		}
	}
	this.bits = str;
}
