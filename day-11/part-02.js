
import ChairMatrix from './lib/chair-matrix.js';
import getDirectoryName from '../shared/lib/get-directory-name.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the chair matrix
	const chairs = await ChairMatrix.fromFile(inputPath);

	// This is the slowest code in the world, be 15 minutes for it to run 😂

	// Fill the chairs until they're stable
	console.log(chairs.fillUntilStable(true));

	// Count the occupied seats
	console.log(chairs.countOccupiedSeats());

})();
