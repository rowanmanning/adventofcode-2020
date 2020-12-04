
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parsePassportFile from './lib/parse-passport-file.js';
import createPassportValidator from './lib/validate-passport.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load and parse the passport file
	const passports = await parsePassportFile(inputPath);

	// Count the valid passports
	const validPassports = passports.filter(createPassportValidator()).length;

	// Log the result
	console.log(validPassports);

})();
