
// Function to step through instructions
export default function stepThroughInstructions(instructions, accumulator = 0, currentIndex = 0, completedIndices = []) {
	if (completedIndices.includes(currentIndex)) {
		throw new Error(`Infinite loop detected at ${currentIndex}. Accumulator = ${accumulator}`);
	}
	const instruction = instructions[currentIndex];
	completedIndices.push(currentIndex);
	if (currentIndex === instructions.length) {
		return accumulator;
	}
	switch (instruction.name) {
		case 'acc':
			return stepThroughInstructions(instructions, accumulator + instruction.value, currentIndex + 1, completedIndices);
		case 'jmp':
			return stepThroughInstructions(instructions, accumulator, currentIndex + instruction.value, completedIndices);
		case 'nop':
			return stepThroughInstructions(instructions, accumulator, currentIndex + 1, completedIndices);
	}
	return null;
}
