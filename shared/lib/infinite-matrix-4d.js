
import {readFile} from 'fs/promises';

export default class InfiniteMatrix4D {
	
	#cells = new Map();
	#bounds = {
		minX: 0,
		minY: 0,
		minZ: 0,
		minW: 0,
		maxX: 0,
		maxY: 0,
		maxZ: 0,
		maxW: 0
	};

	get populatedCellCount() {
		return this.#cells.size;
	}

	get bounds() {
		return Object.assign({}, this.#bounds);
	}

	has(x, y, z, w) {
		return this.#cells.has(InfiniteMatrix4D.#buildKey(x, y, z, w));
	}

	get(x, y, z, w) {
		return this.#cells.get(InfiniteMatrix4D.#buildKey(x, y, z, w)) || null;
	}

	set(x, y, z, w, value) {
		this.#bounds.minX = Math.min(this.#bounds.minX, x);
		this.#bounds.maxX = Math.max(this.#bounds.maxX, x);
		this.#bounds.minY = Math.min(this.#bounds.minY, y);
		this.#bounds.maxY = Math.max(this.#bounds.maxY, y);
		this.#bounds.minZ = Math.min(this.#bounds.minZ, z);
		this.#bounds.maxZ = Math.max(this.#bounds.maxZ, z);
		this.#bounds.minW = Math.min(this.#bounds.minW, w);
		this.#bounds.maxW = Math.max(this.#bounds.maxW, w);
		if (value === null || value === undefined) {
			return this.delete(x, y, z, w);
		}
		return this.#cells.set(InfiniteMatrix4D.#buildKey(x, y, z, w), value);
	}

	delete(x, y, z, w) {
		return this.#cells.delete(InfiniteMatrix4D.#buildKey(x, y, z, w));
	}

	forEach(eachFunction) {
		for (const [key, value] of this.#cells.entries()) {
			eachFunction(value, InfiniteMatrix4D.#parseKey(key));
		}
	}

	forAll(eachFunction) {
		const bounds = this.bounds;
		for (let w = bounds.minW; w <= bounds.maxW; w += 1) {
			for (let z = bounds.minZ; z <= bounds.maxZ; z += 1) {
				for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
					for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
						eachFunction(this.get(x, y, z, w), [x, y, z, w]);
					}
				}
			}
		}
	}

	map(mapFunction) {
		const result = new this.constructor();
		for (const [key, value] of this.#cells.entries()) {
			const [x, y, z, w] = InfiniteMatrix4D.#parseKey(key);
			result.set(x, y, z, w, mapFunction(value, [x, y, z, w]));
		}
		return result;
	}

	mapAll(mapFunction) {
		const bounds = this.#bounds;
		const result = new this.constructor();
		for (let w = bounds.minW; w <= bounds.maxW; w += 1) {
			for (let z = bounds.minZ; z <= bounds.maxZ; z += 1) {
				for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
					for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
						result.set(x, y, z, w, mapFunction(this.get(x, y, z, w), [x, y, z, w]));
					}
				}
			}
		}
		return result;
	}

	filter(filterFunction) {
		const result = new this.constructor();
		for (const [key, value] of this.#cells.entries()) {
			const [x, y, z, w] = InfiniteMatrix4D.#parseKey(key);
			if (filterFunction(value, [x, y, z, w])) {
				result.set(x, y, z, w, value);
			}
		}
		return result;
	}

	clone() {
		const clone = new this.constructor();
		clone.#bounds = Object.assign({}, this.#bounds);
		clone.#cells = new Map(this.#cells);
		return clone;
	}

	slice(x1, y1, z1, w1, x2, y2, z2, w2) {
		const result = new this.constructor();
		for (const [key, value] of this.#cells.entries()) {
			const [x, y, z, w] = InfiniteMatrix4D.#parseKey(key);
			const check = (
				x >= x1 && x <= x2 &&
				y >= y1 && y <= y2 &&
				z >= z1 && z <= z2 &&
				w >= w1 && w <= w2
			);
			if (check) {
				result.set(x, y, z, w, value);
			}
		}
		return result;
	}

	toString() {
		return [...this.#cells.entries()].map(([key, value]) => {
			return `${key}: ${value}`;
		}).join('\n');
	}

	static #buildKey(x, y, z, w) {
		return `${x}/${y}/${z}/${w}`;
	}

	static #parseKey(key) {
		return key.split('/');
	}

	static async fromFile(filePath) {
		return this.fromString(await readFile(filePath, 'utf-8'));
	}

	static fromString(string) {
		const matrix = new this();
		const rows = string.split('\n').map(row => row.split(''));
		for (var y = 0; y < rows.length; y += 1) {
			for (var x = 0; x < rows[y].length; x += 1) {
				matrix.set(x, y, 0, 0, rows[y][x]);
			}
		}
		return matrix;
	}

}
