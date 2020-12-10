
import compareNumbers from '../shared/lib/compare-numbers.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';
import readLinesAsIntegers from '../shared/lib/read-lines-as-integers.js';

// NOTE: I didn't solve this one myself, I based my solution on this one
// https://github.com/DenverCoder1/Advent-of-Code-2020---Javascript/blob/main/Day%2010/part2.js

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the stream of numbers
	const numbers = await readLinesAsIntegers(inputPath);

	function getPossibleAdapterConfigurations(joltRatings) {

		// initialize with 1 for the first and 0 for the rest
		const sortedJoltRatings = joltRatings.sort(compareNumbers);

		// Create an array with a number for each configuration (1 for the first, 0 for all others)
		const configurations = sortedJoltRatings.map((_, index) => {
			return (index === 0 ? 1 : 0);
		});

		// Loop over configurations
		for (const index of Object.keys(configurations)) {
			configurations[index];

			// Find the next lowest index that's in the jolt ratings
			for (let nextLowestIndex = index - 3; nextLowestIndex < index; nextLowestIndex += 1) {
				if (joltRatings[index] <= joltRatings[nextLowestIndex] + 3) {
					configurations[index] += configurations[nextLowestIndex];
				}
			}
		}

		// Return the last value
		return configurations.pop();
	}

	// Log the result
	console.log(getPossibleAdapterConfigurations(numbers));

})();
