
import {readFile} from 'fs/promises';

export default async function parseImageTilesFile(filePath) {
	const tileStrings = (await readFile(filePath, 'utf-8')).split('\n\n');
	return tileStrings.map(parseTile);
}

function parseTile(tileString) {
	const [header, ...rows] = tileString.split('\n');
	const tile = {
		id: Number(header.substring(5, header.length - 1)),
		top: rows[0],
		bottom: rows[rows.length - 1],
		left: rows.map(row => row[0]).join(''),
		right: rows.map(row => row[row.length - 1]).join('')
	};
	tile.topFlipped = tile.top.split('').reverse().join('');
	tile.bottomFlipped = tile.bottom.split('').reverse().join('');
	tile.leftFlipped = tile.left.split('').reverse().join('');
	tile.rightFlipped = tile.right.split('').reverse().join('');
	return tile;
}
