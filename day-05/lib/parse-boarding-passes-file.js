
import getPassId from './get-pass-id.js';
import readLines from '../../shared/lib/read-lines.js';

// Function to parse a boarding passes file
export default async function parseBoardingPassesFile(filePath, options) {
	const passes = await readLines(filePath);
	return passes.map(pass => parseBoardingPass(pass, options));
}

// Function to parse a single boarding pass
function parseBoardingPass(passString) {
	const {row, column} = getBoardingPassPosition(passString.split(''));
	return {
		id: getPassId(row, column),
		row,
		column
	};
}

// Function to get a boarding pass's position on the plane
function getBoardingPassPosition(instructions, options) {
	return instructions.reduce((result, instruction) => {
		const rowCount = result.rowUpperBound - result.rowLowerBound + 1;
		const columnCount = result.columnUpperBound - result.columnLowerBound + 1;
		switch (instruction) {
			case 'F':
				result.rowUpperBound = result.rowUpperBound - (rowCount / 2);
				break;
			case 'B':
				result.rowLowerBound = result.rowLowerBound + (rowCount / 2);
				break;
			case 'L':
				result.columnUpperBound = result.columnUpperBound - (columnCount / 2);
				break;
			case 'R':
				result.columnLowerBound = result.columnLowerBound + (columnCount / 2);
				break;
		}
		if (result.rowUpperBound === result.rowLowerBound) {
			result.row = result.rowUpperBound;
		}
		if (result.columnUpperBound === result.columnLowerBound) {
			result.column = result.columnUpperBound;
		}
		return result;
	}, {
		rowUpperBound: 127,
		rowLowerBound: 0,
		columnUpperBound: 7,
		columnLowerBound: 0
	});
}
