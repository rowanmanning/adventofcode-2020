
import ChairMatrix from './lib/chair-matrix.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the chair matrix
	const chairs = await ChairMatrix.fromFile(inputPath);

	// Fill the chairs until they're stable
	console.log(chairs.fillUntilStable());

	// Count the occupied seats
	console.log(chairs.countOccupiedSeats());

})();
