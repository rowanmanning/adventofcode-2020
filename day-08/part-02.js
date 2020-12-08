
import clone from '../shared/lib/clone.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseInstructionsFile from './lib/parse-instructions-file.js';
import stepThroughInstructions from './lib/step-through-instructions.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load parse the instructions
	const instructions = await parseInstructionsFile(inputPath);

	// Friendlier stepper
	function stepThroughInstructionsNicely(instructions) {
		try {
			return stepThroughInstructions(instructions);
		} catch (error) {
			return null;
		}
	}

	// Fix the instructions by switching one "jmp" or "nop"
	function fixInstructions(instructions) {
		for (const [index, instruction] of Object.entries(instructions)) {
			if (instruction.name === 'acc') {
				continue;
			}
			const instructionsCopy = clone(instructions);
			instructionsCopy[index].name = instruction.name === 'jmp' ? 'nop' : 'jmp';
			const accumulator = stepThroughInstructionsNicely(instructionsCopy);
			if (accumulator !== null) {
				return instructionsCopy;
			}
		}
	}

	// Log the result
	console.log(stepThroughInstructions(fixInstructions(instructions)));

})();

