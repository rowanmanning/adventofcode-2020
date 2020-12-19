
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseMessagesFile from './lib/parse-messages-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input-part-02.txt`;

	// Load and parse the file
	const {rules, messages} = await parseMessagesFile(inputPath);

	// Create a regular expression based on the rules
	const rulesRegExp = rulesToRegExp(rules);

	// Filter invalid messages
	const validMessages = messages.filter(message => rulesRegExp.test(message));

	// Log the result
	console.log(validMessages.length);

	function rulesToRegExp(rules) {
		return new RegExp(`^${ruleToString(flattenRules(rules))}$`);
	}

	function flattenRules(rules, index = 0) {
		const rule = rules.get(index);
		if (rule.type === 'string') {
			return {
				type: rule.type,
				value: rule.value
			};
		} else if (rule.type === 'sequence') {
			return {
				type: rule.type,
				value: rule.value.map(number => {
					if (number === index) {
						return Infinity;
					}
					return flattenRules(rules, number)
				})
			};
		} else {
			return {
				type: rule.type,
				value: rule.value.map(sequence => {
					return sequence.map(number => {
						if (number === index) {
							return Infinity;
						}
						return flattenRules(rules, number)
					});
				})
			};
		}
	}

	function ruleToString(rule) {
		if (rule.type === 'string') {
			return rule.value;
		} else if (rule.type === 'sequence') {
			return rule.value.map(ruleToString).join('');
		} else {
			if (rule.value.flat().includes(Infinity)) {

				// This is just us short-cutting for the rules we know will appear
				// which is a bit gross
				const last = rule.value[1][rule.value[1].length - 1];
				if (last === Infinity) {
					return `(${ruleToString(rule.value[1][0])}+)`;
				}
				const secondLast = rule.value[1][rule.value[1].length - 2];
				if (secondLast === Infinity) {

					// This is gross because JS RegExp does not support recursion
					const ruleString1 = ruleToString(rule.value[0][0]);
					const ruleString2 = ruleToString(rule.value[0][1]);
					// 15 because that's the longest sequence of "a" in the test data
					const equalSidesMatch = Array(15).fill(0).map((_, index) => {
						const count = index + 1;
						return `${ruleString1}{${count}}${ruleString2}{${count}}`;
					});
					return `(${equalSidesMatch.join('|')})`;

				}

			}
			return `(${rule.value.map(sequence => {
				return sequence.map(ruleToString).join('');
			}).join('|')})`;
		}
	}

})();
