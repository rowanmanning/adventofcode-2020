
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseBagRulesFile from './lib/parse-bag-rules-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load parse the bag rules
	const bagRules = await parseBagRulesFile(inputPath);

	// Function to find all parents of a specific bag colour
	function findAllBagParents(rules, bagColor, parents = []) {
		const directParents = rules.filter(rule => rule.requiredBags[bagColor]);
		for (const directParent of directParents) {
			if (!parents.includes(directParent)) {
				parents.push(directParent);
				parents = findAllBagParents(rules, directParent.color, parents);
			}
		}
		return parents;
	}

	// Find all possible parents of a shiny gold bag
	const parents = findAllBagParents(bagRules, 'shiny gold');

	// Log the result
	console.log(parents.length);

})();

