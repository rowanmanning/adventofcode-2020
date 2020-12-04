
import {readFile} from 'fs/promises';

// Function to parse a passport file
export default async function parsePassportFile(filePath) {
	const fileContents = await readFile(filePath, 'utf-8');
	return fileContents.trim().split(/\n{2}/).map(parsePassport);
}

// Function to parse a single passport
function parsePassport(passportString) {
	const entries = passportString.split(/[\s\n]+/).map(parsePassportEntry);
	return Object.fromEntries(entries);
}

// Parse a single passport entry
function parsePassportEntry(entryString) {
	return entryString.split(':');
}
