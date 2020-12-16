
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseTicketNotesFile from './lib/parse-ticket-notes-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the ticket notes
	const ticketNotes = await parseTicketNotesFile(inputPath);

	const allTickets = [ticketNotes.yourTicket, ...ticketNotes.nearbyTickets];
	const ticketFieldIndices = calculateTicketFieldIndices(allTickets, ticketNotes.fields);
	const yourTicket = solveTicket(ticketNotes.yourTicket, ticketFieldIndices);
	const yourDepartureValues = yourTicket
		.filter(([key]) => key.startsWith('departure'))
		.map(([,value]) => value);

	// Log the result
	console.log(
		yourDepartureValues.reduce((a, b) => a * b, 1)
	);

	function solveTicket(ticket, ticketFieldIndices) {
		return ticket.reduce((result, value, index) => {
			result.push([ticketFieldIndices[index], value]);
			return result;
		}, [])
	}

	function calculateTicketFieldIndices(tickets, fields) {
		let unsolvedFieldNames = Object.keys(fields);
		const fieldKnowledge = tickets
			.map(ticket => findImpossibleFieldNames(ticket, fields))
			.flat()
			.filter(field => field.impossibleFields.length < unsolvedFieldNames.length)
			.reduce((knowledge, {index, impossibleFields}) => {
				knowledge[index] = knowledge[index] || {index: index, impossibleFields: []};
				knowledge[index].impossibleFields = [...knowledge[index].impossibleFields, ...impossibleFields];
				return knowledge;
			}, Array(unsolvedFieldNames.length))
		const solved = {};

		while (unsolvedFieldNames.length) {
			for (const {index, impossibleFields} of fieldKnowledge) {
				if (impossibleFields.length === unsolvedFieldNames.length - 1) {
					const field = unsolvedFieldNames.find(fieldName => !impossibleFields.includes(fieldName));
					solved[index] = field;
					unsolvedFieldNames = unsolvedFieldNames.filter(unsolved => unsolved !== field);
				}
			}
		}

		return solved;
	}

	function findImpossibleFieldNames(ticket, fields) {
		fields = Object.entries(fields);
		return ticket.map((value, index) => {
			const impossibleFields = fields
				.filter(([key, ranges]) => {
					for (const [lower, upper] of ranges) {
						if (value >= lower && value <= upper) {
							return false;
						}
					}
					return true;
				})
				.map(([key]) => key);
			return {index, value, impossibleFields};
		});
	}

})();
