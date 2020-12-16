
import readLines from '../../shared/lib/read-lines.js';

// Function to parse the starting numbers for the game
export default async function parseStartingNumbersFile(filePath) {
	const lines = await readLines(filePath, 'utf-8');

	// Parse the file contents
	const rawResult = {};
	let currentKey = null;
	for (const line of lines) {
		const match = line.match(/^(?<key>[^:]+):(?<value>[^\n]+)?$/);
		if (match && match.groups.value) {
			currentKey = null;
			rawResult[match.groups.key] = match.groups.value.trim();
		} else if (match) {
			currentKey = match.groups.key;
			rawResult[currentKey] = [];
		} else if (line.trim()) {
			rawResult[currentKey].push(line);
		}
	}
	
	// Process each field
	return Object.entries(rawResult).reduce((result, [key, value]) => {
		if (key === 'your ticket') {
			result.yourTicket = value[0].split(',').map(Number);
		} else if (key === 'nearby tickets') {
			result.nearbyTickets = value.map(ticket => ticket.split(',').map(Number));
		} else {
			result.fields[key] = value.split(' or ').map(range => {
				return range.split('-').map(Number);
			});
		}
		return result;
	}, {
		fields: {}
	});
}
