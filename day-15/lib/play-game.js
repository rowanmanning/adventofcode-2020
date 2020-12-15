
// Function to play the game
export default function playGame(startingNumbers, endTurn) {
	const numbers = {};
	let turn = 1;
	let lastNumber = null;
	while (turn <= endTurn) {
		if (turn <= startingNumbers.length) {
			lastNumber = startingNumbers[turn - 1];
		} else {
			const previousOccurances = numbers[lastNumber];
			if (previousOccurances.length === 1) {
				lastNumber = 0;
			} else {
				lastNumber = previousOccurances[previousOccurances.length - 1] - previousOccurances[previousOccurances.length - 2];
			}
		}
		numbers[lastNumber] = numbers[lastNumber] || [];
		numbers[lastNumber].push(turn);
		if (numbers[lastNumber].length > 2) {
			numbers[lastNumber].shift();
		}
		turn += 1;
	}
	return lastNumber;
}
