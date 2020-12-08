
import readlines from '../../shared/lib/read-lines.js';

// Function to parse an answers file
export default async function parseBagRulesFile(filePath) {
	const rules = await readlines(filePath);
	return rules.map(parseBagRule);
}

// Function to parse a single bag rule
function parseBagRule(bagRuleString) {
	const [color, requiredBagsString] = bagRuleString.replace('.', '').split(' bags contain ');
	const requiredBags = requiredBagsString.split(', ').reduce((result, bagString) => {
		const requiredBag = parseRequiredBag(bagString);
		if (requiredBag) {
			result[requiredBag.color] = requiredBag.count;
		}
		return result;
	}, {});
	return {
		color,
		requiredBags
	};
}

// Function to parse a required bag
function parseRequiredBag(bagString) {
	if (bagString === 'no other bags') {
		return null;
	}
	const [count, ...bagArray] = bagString.split(' ');
	bagArray.pop();
	return {
		count: parseInt(count, 10),
		color: bagArray.join(' ')
	};
}
