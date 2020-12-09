
import compareLengths from '../shared/lib/compare-lengths.js';
import compareNumbers from '../shared/lib/compare-numbers.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';
import readLinesAsIntegers from '../shared/lib/read-lines-as-integers.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the stream of numbers
	const numbers = await readLinesAsIntegers(inputPath);

	function findInvalidNumberInXMAS(numbers, preambleLength = 25) {
		for (const [index, number] of Object.entries(numbers)) {
			if (index >= preambleLength) {
				const previousNumbers = numbers.slice(index - preambleLength, index);
				const addsUp = previousNumbers.some((previousNumber, previousIndex) => {
					const pairIndex = previousNumbers.indexOf(number - previousNumber);
					return (pairIndex !== previousIndex && pairIndex !== -1);
				});
				if (!addsUp) {
					return number;
				}
			}
		}
	}

	function findWeaknessInXMAS(numbers, preambleLength) {
		const firstInvalidNumber = findInvalidNumberInXMAS(numbers, preambleLength);
		const ranges = [];
		for (const index of Object.keys(numbers)) {
			let total = 0;
			const range = [];
			for (const number of numbers.slice(index)) {
				total += number;
				range.push(number);
				if (total === firstInvalidNumber) {
					ranges.push(range);
					break;
				}
				if (total > firstInvalidNumber) {
					break;
				}
			}
		}
		const longestRangeSorted = ranges.sort(compareLengths).pop().sort(compareNumbers);
		return longestRangeSorted[0] + longestRangeSorted[longestRangeSorted.length - 1];
	}

	// Log the result
	console.log(findWeaknessInXMAS(numbers));

})();
