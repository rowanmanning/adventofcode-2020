
import readlines from '../../shared/lib/read-lines.js';

// Function to parse a directions file
export default async function parseDirectionsFile(filePath) {
	const directions = await readlines(filePath);
	return directions.map(parseDirection);
}

// Function to parse a single instruction
function parseDirection(directionString) {
	return {
		instruction: directionString[0],
		value: Number(directionString.slice(1))
	};
}
