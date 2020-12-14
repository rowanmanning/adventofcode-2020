
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseBusNotesFile from './lib/parse-bus-notes-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the bus notes
	const {earliestLeavingTime, buses} = await parseBusNotesFile(inputPath);

	// Log the result
	const result = findClosestBus(buses.filter(bus => bus !== null), earliestLeavingTime);
	console.log(result.bus * result.waitTime);

	// Find the closest bus to a leaving time
	function findClosestBus(buses, earliestLeavingTime, closestBus = null) {
		let leavingTime = earliestLeavingTime;
		while (!closestBus) {
			const bus = buses.find(bus => leavingTime % bus === 0);
			if (bus) {
				closestBus = bus;
				break;
			}
			leavingTime += 1;
		}
		return {
			bus: closestBus,
			waitTime: leavingTime - earliestLeavingTime
		};
	}

})();
