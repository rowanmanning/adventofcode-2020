
import {readFile} from 'fs/promises';

// Function to parse an answers file
export default async function parseAnswersFile(filePath) {
	const fileContent = await readFile(filePath, 'utf-8');
	return fileContent.split('\n\n').map(parseGroupAnswers);
}

// Function to parse a single group's answers
function parseGroupAnswers(groupString) {
	const answers = groupString.replace(/\s+/g, '').split('');
	const people = groupString.split('\n').length;
	return {answers, people};
}
