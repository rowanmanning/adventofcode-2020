'use strict';

const readLinesAsIntegers = require('../utils/read-lines-as-integers');
const compareNumbers = require('../utils/compare-numbers');

(async () => {

	// Load numbers and sort them low to high
	const numbers = await readLinesAsIntegers(`${__dirname}/input.txt`);
	const sortedNumbers = numbers.sort(compareNumbers);

	// Loop over numbers, prioritising the most likely pairs (low and high)
	let selectedNumbers;
	for (const firstNumber of sortedNumbers) {
		for (const secondNumber of sortedNumbers.reverse()) {
			if (firstNumber + secondNumber === 2020) {
				selectedNumbers = [firstNumber, secondNumber];
				break;
			}
		}
	}

	// Return the selected numbers multiplied
	if (selectedNumbers) {
		return console.log(selectedNumbers[0] * selectedNumbers[1]);
	}

	// There was no match
	console.error('no match');

})();
