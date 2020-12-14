
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseDockingInitializationProgramFile from './lib/parse-docking-initialization-program-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the program
	const program = await parseDockingInitializationProgramFile(inputPath);

	// Run the program and log output
	const output = runProgram(program);
	console.log(Object.values(output.mem).reduce((a, b) => a + b, 0));

	// Function to run a docking initialization program
	function runProgram(program) {
		const variables = {};

		// Loop over lines in the program
		for (const line of program) {
			const {name, property} = line.set;
			let {value} = line;

			// Transform the value if the variable we're setting is "mem"
			if (name === 'mem') {
				
				// Convert the number to binary and split into an array
				value = Number(value).toString(2).padStart(36, '0').split('');

				// Apply the mask
				for(let index = 0; index < 36; index += 1){
					if(variables.mask[index] !== 'X'){
						value[index] = variables.mask[index];
					}
				}

				// Convert the array back to a string and parse back into decimal
				value = parseInt(value.join(''), 2);
			}

			// Set variables
			if (property) {
				variables[name] = variables[name] || {};
				variables[name][property] = value;
			} else {
				variables[name] = value;
			}
		}
		return variables;
	}

})();
