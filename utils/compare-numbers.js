'use strict';

module.exports = function compareNumbers(firstNumber, secondNumber) {
	if (firstNumber < secondNumber) {
		return -1;
	}
	if (firstNumber > secondNumber) {
		return 1;
	}
	return 0;
};
