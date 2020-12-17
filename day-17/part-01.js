
import getDirectoryName from '../shared/lib/get-directory-name.js';
import PocketDimension3D from './lib/pocket-dimension-3d.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the pocket dimension
	const dimension = await PocketDimension3D.fromFile(inputPath);

	// Log the result
	console.log(dimension.simulate(6).activeCellCount);

})();
