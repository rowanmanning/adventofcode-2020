
import {readFile} from 'fs/promises';

export default async function readLines(filePath) {
	const content = await readFile(filePath, 'utf-8');
	return content.trim().split('\n');
}
