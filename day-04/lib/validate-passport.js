
// Fields required for a valid passport
const requiredFields = [
	'byr',
	'iyr',
	'eyr',
	'hgt',
	'hcl',
	'ecl',
	'pid'
];

// Field validators
const fieldValidators = {

	// byr (Birth Year) - four digits; at least 1920 and at most 2002.
	byr: input => {
		const number = parseInt(input, 10);
		return (number >= 1920 && number <= 2002);
	},

	// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
	iyr: input => {
		const number = parseInt(input, 10);
		return (number >= 2010 && number <= 2020);
	},

	// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
	eyr: input => {
		const number = parseInt(input, 10);
		return (number >= 2020 && number <= 2030);
	},

	// hgt (Height) - a number followed by either cm or in:
	// If cm, the number must be at least 150 and at most 193.
	// If in, the number must be at least 59 and at most 76.
	hgt: input => {
		const number = parseInt(input, 10);
		if (input.endsWith('cm')) {
			return (number >= 150 && number <= 193);
		} else {
			return (number >= 59 && number <= 76);
		}
	},

	// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
	hcl: input => {
		return /^#[0-9a-f]{6}$/.test(input);
	},

	// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
	ecl: input => {
		const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
		return validEyeColors.includes(input);
	},

	// pid (Passport ID) - a nine-digit number, including leading zeroes.
	pid: input => {
		return /^\d{9}$/.test(input);
	}

}

// Generate a function to validate a passport
export default function createPassportValidator(strictlyValidateFields = false) {
	return function validatePassport(passport) {

		// First check that all valid fields are present
		if (!requiredFields.every(field => field in passport)) {
			return false;
		}

		// Strictly validate each field if asked
		if (strictlyValidateFields) {
			return requiredFields.every(field => {
				if (fieldValidators[field]) {
					return fieldValidators[field](passport[field]);
				}
				return false;
			});
		}

		// All valid then
		return true;

	}
}
