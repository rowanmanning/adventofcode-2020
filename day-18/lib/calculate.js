
export default function calculate(expression, additionPrecedent = false) {
	let result = additionPrecedent ? [0] : 0;
	let operator = '+';
	for (let part of expression) {
		if (Array.isArray(part)) {
			part = calculate(part);
		}
		if (typeof part === 'string') {
			operator = part;
		} else {
			if (operator === '+') {
				if (additionPrecedent) {
					result.push(result.pop() + part);
				} else {
					result = result + part;
				}
			}
			if (operator === '*') {
				if (additionPrecedent) {
					result.push(operator);
					result.push(part);
				} else {
					result = result * part;
				}
			}
		}
	}
	if (additionPrecedent) {
		return result.reduce((product, part) => {
			if (part !== '*') {
				return product * part;
			}
			return product;
		}, 1);
	}
	return result;
}
