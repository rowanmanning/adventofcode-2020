
import {readFile} from 'fs/promises';

// Function to parse the starting numbers for the game
export default async function parseStartingNumbersFile(filePath) {
	return (await readFile(filePath, 'utf-8')).split(',').map(Number);
}
