
import getDirectoryName from '../shared/lib/get-directory-name.js';
import TreeMap from './lib/tree-map.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Create a tree map from the input file
	const treeMap = await TreeMap.fromFile(inputPath);

	// Count the trees for each path
	const treeCounts = [
		treeMap.countTreesOnPath(1, 1),
		treeMap.countTreesOnPath(3, 1),
		treeMap.countTreesOnPath(5, 1),
		treeMap.countTreesOnPath(7, 1),
		treeMap.countTreesOnPath(1, 2)
	];

	// Multiply all the tree counts together
	const product = treeCounts.reduce((total, count) => total * count, 1);

	// Log the result
	console.log(product);

})();
