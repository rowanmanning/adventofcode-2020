
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseMathExpression from './lib/parse-math-expression.js';
import calculate from './lib/calculate.js';
import readLines from '../shared/lib/read-lines.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load and parse the expressions
	const expressions = await readLines(inputPath);

	const result = expressions
		.map(expression => {
			return calculate(parseMathExpression(expression));
		})
		.reduce((a, b) => a + b, 0);

	// Log the result
	console.log(result);

})();
