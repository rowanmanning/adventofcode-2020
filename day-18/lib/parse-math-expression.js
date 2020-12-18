
export default function parseMathExpression(expression) {
	const result = [];
	let buffer = '';
	let nestLevel = 0;
	function debuffer() {
		if (Array.isArray(buffer)) {
			result.push(buffer);
		} else if (buffer) {
			result.push(Number(buffer));
		}
		buffer = '';
	}
	for (let index = 0; index < expression.length; index += 1) {
		const character = expression[index];
		switch (character) {
			case '(': {
				nestLevel += 1;
				if (nestLevel === 1) {
					debuffer();
				} else {
					buffer += character;
				}
				break;
			}
			case ')': {
				nestLevel -= 1;
				if (nestLevel === 0) {
					buffer = parseMathExpression(buffer);
					debuffer();
				} else {
					buffer += character;
				}
				break;
			}
			case '+': {
				if (nestLevel === 0) {
					debuffer();
					result.push(character);
				} else {
					buffer += character;
				}
				break;
			}
			case '*': {
				if (nestLevel === 0) {
					debuffer();
					result.push(character);
				} else {
					buffer += character;
				}
				break
			}
			default: {
				if (character !== ' ') {
					buffer += character;
				}
				break;
			}
		}
	}
	debuffer();
	return result;
}
