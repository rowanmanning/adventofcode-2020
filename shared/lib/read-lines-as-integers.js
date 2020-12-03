
import readLines from './read-lines.js';

export default async function readLinesAsIntegers(filePath) {
	const lines = await readLines(filePath);
	return lines.map(line => parseInt(line, 10));
}
