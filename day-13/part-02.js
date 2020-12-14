
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseBusNotesFile from './lib/parse-bus-notes-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the bus notes
	const {buses} = await parseBusNotesFile(inputPath);
	const busOffsets = buses.reduce((result, id, offset) => {
		if (id !== null) {
			result.push({id, offset});
		}
		return result;
	}, []);

	// Log the result
	console.log(findTime(busOffsets));

	// I don't fully understand this yet, but it's adapted from this answer:
	// https://github.com/davidsharp/advent-of-code/blob/main/days/13.js
	function findTime(buses) {
		// Reduce the buses, so we examine one bus number at a time
		const result = buses.slice(1).reduce(({start, coprime, buses}, bus) => {
			let timestamp = start + coprime;
			let found = false;
			buses.push(bus);

			// Loop until we find a result
			while (!found) {
				found = buses
					.map(bus => {
						// I still don't fully understand this
						return ((timestamp + bus.offset + coprime) % bus.id === 0);
					})
					.every(found => found);
				timestamp += coprime;
			}

			return ({
				start: timestamp,
				coprime: coprime * bus.id,
				buses
			});

		}, {
			start: buses[0].id,
			coprime: buses[0].id,
			buses: [buses[0]]
		});

		return result.start;
	}

})();
