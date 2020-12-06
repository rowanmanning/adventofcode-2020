
import compareNumbers from '../shared/lib/compare-numbers.js';
import findMissingSeat from './lib/find-missing-seat.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseBoardingPassesFile from './lib/parse-boarding-passes-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load and parse the boarding passes
	const passes = await parseBoardingPassesFile(inputPath);

	const missingSeat = findMissingSeat(passes);

	// Log the result
	console.log(missingSeat);

})();

