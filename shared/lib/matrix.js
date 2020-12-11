
import {readFile} from 'fs/promises';

export default class Matrix {
	
	#width = 0;
	#height = 0;
	#cells = [];

	constructor(matrixString) {
		const rows = matrixString.split('\n');
		this.#height = rows.length;
		this.#width = rows[0].length;
		rows.forEach((row, y) => {
			row.split('').forEach((value, x) => {
				this.#cells.push({x, y, value});
			});
		});
	}

	get(x, y) {
		const cell = this.#cells.find(cell => cell.x === x && cell.y === y);
		return (cell ? cell.value : null);
	}

	set(x, y, value) {
		const cell = this.get(x, y);
		cell.value = value;
	}

	getNeighbors(x, y) {
		return this.#cells
			.filter(cell => {
				return (
					cell.x >= x - 1 &&
					cell.x <= x + 1 &&
					cell.y >= y - 1 &&
					cell.y <= y + 1 &&
					!(cell.x === x && cell.y === y)
				);
			})
			.map(cell => cell.value);
	}

	getPath(x, y, stepX, stepY) {
		const path = [this.get(x, y)];
		while (path[path.length - 1] !== null) {
			x += stepX;
			y += stepY;
			path.push(this.get(x, y));
		}
		return path;
	}

	forEach(eachFunction) {
		for (const cell of this.#cells) {
			eachFunction(cell.value, [cell.x, cell.y])
		}
	}

	map(mapFunction) {
		const newCells = [];
		for (const cell of this.#cells) {
			newCells.push({
				x: cell.x,
				y: cell.y,
				value: mapFunction(cell.value, [cell.x, cell.y])
			});
		}
		this.#cells = newCells;
	}

	count(filterFunction) {
		return this.#cells.filter(cell => {
			return filterFunction(cell.value, [cell.x, cell.y]);
		}).length;
	}

	toString() {
		const rows = [];
		for (const cell of this.#cells) {
			rows[cell.y] = rows[cell.y] || [];
			rows[cell.y][cell.x] = cell.value;
		}
		return rows.map(row => row.join('')).join('\n');
	}

	static async fromFile(filePath) {
		return new this(await readFile(filePath, 'utf-8'));
	}

}
