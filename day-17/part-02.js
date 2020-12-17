
import getDirectoryName from '../shared/lib/get-directory-name.js';
import PocketDimension4D from './lib/pocket-dimension-4d.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the pocket dimension
	const dimension = await PocketDimension4D.fromFile(inputPath);

	// Log the result
	console.log(dimension.simulate(6).populatedCellCount);

})();
