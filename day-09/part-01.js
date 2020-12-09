
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

	// Log the result
	console.log(findInvalidNumberInXMAS(numbers));

})();
