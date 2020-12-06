
export default function range(low, high) {
	return Array(high - low + 1).fill().map((value, key) => low + key);
}
