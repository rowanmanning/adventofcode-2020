
import getPassId from './get-pass-id.js';
import range from '../../shared/lib/range.js';

// Function to find the missing seat on a plane
export default function findMissingSeat(existingPasses) {
	const existingPassIds = existingPasses.map(pass => pass.id);
	for (let row = 0; row <= 127; row += 1) {

		// Get the missing seats in the current row
		const missingSeatsInRow = range(0, 7)
			.map(column => getPassId(row, column))
			.filter(passId => existingPassIds.includes(passId));

		// If there are 8 missing seats, the row does not exist so we ignore it
		if (missingSeatsInRow.length === 8) {
			continue;
		}

		// If there is only 1 missing seat, then it can't be this row because
		// we're supposed to have an occupied seat either side of us
		if (missingSeatsInRow.length === 1) {
			continue;
		}

		console.log(missingSeatsInRow);

		// TODO I didn't actually finish this, I manually looked at the resulting array
		// and used that answer. Fix this at some point
	}
}
