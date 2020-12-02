'use strict';

const readLines = require('../utils/read-lines');

(async () => {

	// Create a beautiful regular expression
	const passwordRegExp = /^(?<min>\d+)-(?<max>\d+) (?<character>[a-z]): (?<password>.*)$/;

	// Function to parse a password string
	function parsePasswordString(string) {
		const {groups} = string.match(passwordRegExp);
		return {
			min: parseInt(groups.min, 10),
			max: parseInt(groups.max, 10),
			character: groups.character,
			password: groups.password
		};
	}

	// Function to check whether a password is valid
	function isValidPassword({min, max, character, password}) {
		const characterCount = password.split('').filter(i => i === character).length;
		return (characterCount >= min && characterCount <= max);
	}

	// Load and parse the lines
	const lines = await readLines(`${__dirname}/input.txt`);
	const passwords = lines.map(parsePasswordString);

	// Filter out invalid passwords and log the length of the resulting array
	console.log(passwords.filter(isValidPassword).length);

})();
