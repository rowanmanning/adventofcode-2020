
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseStartingNumbersFile from './lib/parse-starting-numbers-file.js';
import playGame from './lib/play-game.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the starting numbers
	const startingNumbers = await parseStartingNumbersFile(inputPath);

	// Play the game until the 2020th turn
	const result = playGame(startingNumbers, 2020);
	console.log(result);

})();
