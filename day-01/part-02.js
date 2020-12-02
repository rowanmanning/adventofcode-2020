'use strict';

const readLinesAsIntegers = require('../utils/read-lines-as-integers');
const compareNumbers = require('../utils/compare-numbers');

(async () => {

	// Load numbers and sort them low to high
	const numbers = await readLinesAsIntegers(`${__dirname}/input.txt`);
	const sortedNumbers = numbers.sort(compareNumbers);

	// Loop over numbers (lol I can't be bothered doing this in a better way, it's beautiful)
	let selectedNumbers;
	for (const firstNumber of sortedNumbers) {
		for (const secondNumber of sortedNumbers) {
			for (const thirdNumber of sortedNumbers) {
				if (firstNumber + secondNumber + thirdNumber === 2020) {
					selectedNumbers = [firstNumber, secondNumber, thirdNumber];
					break;
				}
			}
		}
	}

	// Return the selected numbers multiplied
	if (selectedNumbers) {
		return console.log(selectedNumbers[0] * selectedNumbers[1] * selectedNumbers[2]);
	}

	// There was no match
	console.error('no match');

})();
