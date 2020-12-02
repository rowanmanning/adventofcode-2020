'use strict';

const readLines = require('./read-lines');

module.exports = async function readLinesAsIntegers(filePath) {
	const lines = await readLines(filePath);
	return lines.map(line => parseInt(line, 10));
};
