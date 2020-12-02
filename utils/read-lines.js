'use strict';

const {readFile} = require('fs').promises;

module.exports = async function readLines(filePath) {
	const content = await readFile(filePath, 'utf-8');
	return content.trim().split('\n');
};
