
import readlines from '../../shared/lib/read-lines.js';

// Function to parse a docking initializeation program file
export default async function parseDockingInitializationProgramFile(filePath) {
	const lines = await readlines(filePath);
	return lines.map(parseCommand);
}

function parseCommand(commandString) {
	const [command, value] = commandString.split(' = ');
	const set = command.match(/(?<name>[a-z]+)(\[(?<property>\d+)\])?/);
	return {
		set: {
			name: set.groups.name,
			property: set.groups.property || null
		},
		value
	};
}
