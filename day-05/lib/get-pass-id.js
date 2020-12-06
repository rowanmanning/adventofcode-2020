
// Function to get a pass ID from rows/columns
export default function getPassId(row, column) {
	return (row * 8) + column;
}
