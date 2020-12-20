
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseImageTilesFile from './lib/parse-image-tiles-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load and parse the image tiles
	const tiles = await parseImageTilesFile(inputPath);

	const tileEdgeMatches = tiles.reduce((result, tile) => {
		result[tile.top] = result[tile.top] || [];
		result[tile.bottom] = result[tile.bottom] || [];
		result[tile.left] = result[tile.left] || [];
		result[tile.right] = result[tile.right] || [];
		result[tile.topFlipped] = result[tile.topFlipped] || [];
		result[tile.bottomFlipped] = result[tile.bottomFlipped] || [];
		result[tile.leftFlipped] = result[tile.leftFlipped] || [];
		result[tile.rightFlipped] = result[tile.rightFlipped] || [];
		result[tile.top].push(tile.id);
		result[tile.bottom].push(tile.id);
		result[tile.left].push(tile.id);
		result[tile.right].push(tile.id);
		result[tile.topFlipped].push(tile.id);
		result[tile.bottomFlipped].push(tile.id);
		result[tile.leftFlipped].push(tile.id);
		result[tile.rightFlipped].push(tile.id);
		return result;
	}, {});

	const cornerTiles = tiles.filter(tile => {
		const tileMatches = Object.values(tileEdgeMatches).filter(match => match.includes(tile.id));
		const edgeCount = tileMatches.filter(match => match.length === 1).length / 2;
		return edgeCount === 2;
	});

	// Log the result
	console.log(cornerTiles.map(tile => tile.id).reduce((a, b) => a * b, 1));

})();
