
import getDirectoryName from '../shared/lib/get-directory-name.js';
import TreeMap from './lib/tree-map.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Create a tree map from the input file
	const treeMap = await TreeMap.fromFile(inputPath);

	// Count the trees
	const treeCount = treeMap.countTreesOnPath(3, 1);

	// Log the result
	console.log(treeCount);

})();
