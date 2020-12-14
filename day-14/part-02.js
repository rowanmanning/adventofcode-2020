
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
			let {name, property} = line.set;
			let {value} = line;

			// Transform the value if the variable we're setting is "mem"
			if (name === 'mem') {
				
				// Convert the memory space to binary and split into an array
				property = Number(property).toString(2).padStart(36, '0').split('');

				// Apply the mask
				for(let index = 0; index < 36; index += 1){
					if(variables.mask[index] !== '0'){
						property[index] = variables.mask[index];
					}
				}

				// Replace the masked characters with every possibility
				// and set each memory space
				const possibleProperties = findAllPossibleProperies(property);
				for (const newProperty of possibleProperties) {
					const newPropertyInt = parseInt(newProperty.join(''), 2);
					variables[name] = variables[name] || {};
					variables[name][newPropertyInt] = parseInt(value, 10);
				}
				continue;
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

	function findAllPossibleProperies(property) {
		const possibleProperties = [[]];
		for (const character of property) {
			if (character === 'X') {
				possibleProperties.forEach(possibleProperty => {
					possibleProperties.push([...possibleProperty, 0]);
					possibleProperty.push(1);
				});
				continue;
			}
			possibleProperties.forEach(possibleProperty => {
				possibleProperty.push(character);
			});
		}
		return possibleProperties;
	}

})();
