
import readlines from '../../shared/lib/read-lines.js';

// Function to parse an instructions file
export default async function parseInstructionsFile(filePath) {
	const instructions = await readlines(filePath);
	return instructions.map(parseInstruction);
}

// Function to parse a single instruction
function parseInstruction(instructionString) {
	const [name, valueString] = instructionString.split(' ');
	return {
		name,
		value: parseInt(valueString, 10)
	};
}
