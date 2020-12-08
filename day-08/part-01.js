
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseInstructionsFile from './lib/parse-instructions-file.js';
import stepThroughInstructions from './lib/step-through-instructions.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load parse the instructions
	const instructions = await parseInstructionsFile(inputPath);

	// Log the result
	console.log(stepThroughInstructions(instructions));

})();

