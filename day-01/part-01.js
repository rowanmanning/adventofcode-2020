
import compareNumbers from '../shared/lib/compare-numbers.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';
import readLinesAsIntegers from '../shared/lib/read-lines-as-integers.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load numbers and sort them low to high
	const numbers = await readLinesAsIntegers(inputPath);
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
