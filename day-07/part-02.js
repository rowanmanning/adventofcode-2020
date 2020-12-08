
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseBagRulesFile from './lib/parse-bag-rules-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load parse the bag rules
	const bagRules = await parseBagRulesFile(inputPath);

	// Function to find all children of a specific bag colour
	function findAllChildren(rules, bagColor, children = [], level = 0) {
		const currentRule = rules.find(rule => rule.color === bagColor);
		for (const [color, count] of Object.entries(currentRule.requiredBags)) {
			for (let i = 0; i < count; i += 1) {
				children.push(color);
				children = findAllChildren(rules, color, children, level + 1);
			}
		}
		return children;
	}

	// Find all required children of a shiny gold bag
	const children = findAllChildren(bagRules, 'shiny gold');

	// Log the result
	console.log(children.length);

})();

