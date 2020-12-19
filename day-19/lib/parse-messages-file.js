
import {readFile} from 'fs/promises';

export default async function parseMessagesFile(filePath) {
	const [rawRules, rawMessages] = (await readFile(filePath, 'utf-8')).split('\n\n');
	return {
		rules: parseRules(rawRules),
		messages: parseMessages(rawMessages)
	}
}

function parseRules(rules) {
	return rules
		.split('\n')
		.map(rule => {
			const match = rule.match(/^(?<index>\d+): ("(?<string>[a-z]+)"|(?<sequence>[\d\s]+)|(?<orSequence>[\d\s|]+))$/i);
			const index = Number(match.groups.index);
			const {string, sequence, orSequence} = match.groups;
			let validation;
			if (string) {
				validation =  {
					type: 'string',
					value: string
				};
			}
			if (sequence) {
				validation = {
					type: 'sequence',
					value: sequence.split(' ').map(Number)
				};
			}
			if (orSequence) {
				validation = {
					type: 'orSequence',
					value: orSequence.split('|').map(subSequence => {
						return subSequence.trim().split(' ').map(Number)
					})
				};
			}
			return {
				index,
				validation
			};
		})
		.reduce((result, rule) => {
			result.set(rule.index, rule.validation);
			return result;
		}, new Map())
}

function parseMessages(messages) {
	return messages.split('\n');
}
