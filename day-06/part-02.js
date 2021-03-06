
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseAnswersFile from './lib/parse-answers-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load and parse the answers
	const groups = await parseAnswersFile(inputPath);
	
	// Calculate the result
	const total = groups
		.map(group => {
			return [...new Set(group.answers)].filter(answer => {
				return group.answers.filter(a => a === answer).length === group.people;
			}).length;
		})
		.reduce((a, b) => a + b, 0);

	// Log the result
	console.log(total);

})();

