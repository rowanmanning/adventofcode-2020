
import getDirectoryName from '../shared/lib/get-directory-name.js';
import readLines from '../shared/lib/read-lines.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Create a beautiful regular expression
	const passwordRegExp = /^(?<position1>\d+)-(?<position2>\d+) (?<character>[a-z]): (?<password>.*)$/;

	// Function to parse a password string
	function parsePasswordString(string) {
		const {groups} = string.match(passwordRegExp);
		return {
			index1: parseInt(groups.position1, 10) - 1,
			index2: parseInt(groups.position2, 10) - 1,
			character: groups.character,
			password: groups.password
		};
	}

	// Function to check whether a password is valid
	function isValidPassword({index1, index2, character, password}) {
		const hasCharacterInIndex1 = (password[index1] === character);
		const hasCharacterInIndex2 = (password[index2] === character);

		// Both indexes have the character, invalid
		if (hasCharacterInIndex1 && hasCharacterInIndex2) {
			return false;
		}

		// If either index has the character, it's a valid password
		return (hasCharacterInIndex1 || hasCharacterInIndex2);
	}

	// Load and parse the lines
	const lines = await readLines(inputPath);
	const passwords = lines.map(parsePasswordString);

	// Filter out invalid passwords and log the length of the resulting array
	console.log(passwords.filter(isValidPassword).length);

})();
