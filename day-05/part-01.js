
import compareNumbers from '../shared/lib/compare-numbers.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseBoardingPassesFile from './lib/parse-boarding-passes-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load and parse the boarding passes
	const passes = await parseBoardingPassesFile(inputPath);

	// Sort the pass IDs and take the highest
	const highestPassId = passes.map(pass => pass.id).sort(compareNumbers).pop();

	// Log the result
	console.log(highestPassId);

})();

