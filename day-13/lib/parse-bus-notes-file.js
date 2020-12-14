
import readlines from '../../shared/lib/read-lines.js';

// Function to parse a bus notes file
export default async function parseBusNotesFile(filePath) {
	const [timestamp, busesString] = await readlines(filePath);
	return {
		earliestLeavingTime: Number(timestamp),
		buses: busesString.split(',').map(bus => {
			return bus === 'x' ? null : Number(bus);
		})
	};
}
