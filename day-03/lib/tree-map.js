
import {readFile} from 'fs/promises';

// Class to represent a map of trees
export default class TreeMap {

	#lastColumnIndex = 0;
	#lastRowIndex = 0;
	#points = [];

	constructor(stringMap) {

		// Process the string map into a flat array of points
		stringMap.split('\n').forEach((row, y) => {
			row.split('').forEach((value, x) => {
				this.#points.push({x, y, value});
			});
		});

		// Grab the last row index and the index where
		// the columns need to wrap
		const lastPoint = this.#points[this.#points.length - 1];
		this.#lastColumnIndex = lastPoint.x;
		this.#lastRowIndex = lastPoint.y;
	}

	// Get the cell value at x and y, considering that x wraps
	getValue(x, y) {

		// Y can't be greater than the bottom row
		if (y > this.#lastRowIndex) {
			throw new RangeError(`Y value "${y}" is out of bounds`);
		}

		// If X is greater than the last column index, wrap
		// it round
		if (x > this.#lastColumnIndex) {
			x = x % (this.#lastColumnIndex + 1);
		}

		// Find a matching point
		const point = this.#points.find(point => {
			return (point.x === x && point.y === y);
		});

		// Return the point value or undefined if there was no point
		return (point ? point.value : undefined);
	}

	// Check whether there's a tree at position x/y
	isTree(x, y) {
		return (this.getValue(x, y) === '#');
	}

	// Count the number of trees on a path with a given x and y step
	countTreesOnPath(xStep, yStep) {
		let x = 0;
		let y = 0;
		let treeCount = 0;
		while (y <= this.#lastRowIndex) {
			if (this.isTree(x, y)) {
				treeCount += 1;
			}
			x += xStep;
			y += yStep;
		}
		return treeCount;
	}

	static async fromFile(filePath) {
		return new this(await readFile(filePath, 'utf-8'));
	}

}
