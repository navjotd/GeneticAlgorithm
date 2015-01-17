GeneticAlgorithm
================

visualization: navjot.ca/GeneticAlgorithm

####Problem
Find a sequence of numbers and operations(+,-,*,/) that evaluates to a given target.

Example: if the target is 44, then a solution is 9-2*9/4+6*2+2/7*8-7-1-7+7. Note that order of operations doesn't apply and you evaluate from left to right.

####How it Works
We make a population of chromosomes, which are essentially strings of binary digits of length 300. Each gene in the chromosome, in other words, each 4 digit segment in the chromosome is an encoding for a number or an operation. Therefore we can decode a chromosome to determine the value is represents. If this value is close to the target, then we have a "fitter" candidate for the result.

We evolve the population, giving more probability to fitter chromosome to pass on their genes, and thus a fitter population is conceived. Slowly the population of chromosomes evolves to converge to the target value.

This is not the most efficient way to solve this problem, but it's just a cool way to solve problems just like nature does it.

You can see the visualization at navjot.ca/GeneticAlgorithm
