
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseMessagesFile from './lib/parse-messages-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input-part-01.txt`;

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
				value: rule.value.map(number => flattenRules(rules, number))
			};
		} else {
			return {
				type: rule.type,
				value: rule.value.map(sequence => {
					return sequence.map(number => {
						return flattenRules(rules, number);
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
			return `(${rule.value.map(sequence => {
				return sequence.map(ruleToString).join('');
			}).join('|')})`;
		}
	}

})();
