
import compareNumbers from '../shared/lib/compare-numbers.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';
import readLinesAsIntegers from '../shared/lib/read-lines-as-integers.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the stream of numbers
	const numbers = await readLinesAsIntegers(inputPath);

	function getJoltDifferences(joltRatings) {
		const sortedJoltRatings = joltRatings.sort(compareNumbers);
		sortedJoltRatings.push(sortedJoltRatings[sortedJoltRatings.length - 1] + 3);
		return sortedJoltRatings
			.map((joltRating, index) => {
				const previousJoltRating = sortedJoltRatings[index - 1] || 0;
				return joltRating - previousJoltRating;
			})
			.reduce((result, diff) => {
				result[diff] = result[diff] ? result[diff] + 1 : 1;
				return result;
			}, {});
	}

	const differences = getJoltDifferences(numbers);

	// Log the result
	console.log(differences[1] * differences[3]);

})();
