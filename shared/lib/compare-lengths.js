
export default function compareLengths(firstValue, secondValue) {
	if (firstValue.length < secondValue.length) {
		return -1;
	}
	if (firstValue.length > secondValue.length) {
		return 1;
	}
	return 0;
}
