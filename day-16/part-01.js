
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseTicketNotesFile from './lib/parse-ticket-notes-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the ticket notes
	const ticketNotes = await parseTicketNotesFile(inputPath);

	function findInvalidValues(tickets, fields) {
		return tickets
			.map(ticket => {
				return findPossibleFieldNames(ticket, fields)
			})
			.reduce((result, ticket) => {
				return [
					...result,
					...ticket
						.filter(field => field.possibleFields.length === 0)
						.map(field => field.value)
				];
			}, []);
	}

	function findPossibleFieldNames(ticket, fields) {
		fields = Object.entries(fields);
		return ticket.map(value => {
			const possibleFields = fields
				.filter(([key, ranges]) => {
					for (const [lower, upper] of ranges) {
						if (value >= lower && value <= upper) {
							return true;
						}
					}
					return false;
				})
				.map(([key]) => key);
			return {value, possibleFields};
		});
	}

	// Log the result
	console.log(
		findInvalidValues(ticketNotes.nearbyTickets, ticketNotes.fields).reduce((a, b) => a + b, 0)
	);

})();
