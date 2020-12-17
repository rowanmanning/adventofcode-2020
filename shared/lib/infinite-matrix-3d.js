
import {readFile} from 'fs/promises';

export default class InfiniteMatrix3D {
	
	#cells = new Map();
	#bounds = {
		minX: 0,
		minY: 0,
		minZ: 0,
		maxX: 0,
		maxY: 0,
		maxZ: 0
	};

	get populatedCellCount() {
		return this.#cells.size;
	}

	get bounds() {
		return Object.assign({}, this.#bounds);
	}

	has(x, y, z) {
		return this.#cells.has(InfiniteMatrix3D.#buildKey(x, y, z));
	}

	get(x, y, z) {
		return this.#cells.get(InfiniteMatrix3D.#buildKey(x, y, z)) || null;
	}

	set(x, y, z, value) {
		this.#bounds.minX = Math.min(this.#bounds.minX, x);
		this.#bounds.maxX = Math.max(this.#bounds.maxX, x);
		this.#bounds.minY = Math.min(this.#bounds.minY, y);
		this.#bounds.maxY = Math.max(this.#bounds.maxY, y);
		this.#bounds.minZ = Math.min(this.#bounds.minZ, z);
		this.#bounds.maxZ = Math.max(this.#bounds.maxZ, z);
		return this.#cells.set(InfiniteMatrix3D.#buildKey(x, y, z), value);
	}

	delete(x, y, z) {
		return this.#cells.delete(InfiniteMatrix3D.#buildKey(x, y, z));
	}

	forEach(eachFunction) {
		for (const [key, value] of this.#cells.entries()) {
			eachFunction(value, InfiniteMatrix3D.#parseKey(key));
		}
	}

	forAll(eachFunction) {
		const bounds = this.bounds;
		for (let z = bounds.minZ; z <= bounds.maxZ; z += 1) {
			for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
				for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
					eachFunction(this.get(x, y, z), [x, y, z]);
				}
			}
		}
	}

	map(mapFunction) {
		const result = new this.constructor();
		for (const [key, value] of this.#cells.entries()) {
			const [x, y, z] = InfiniteMatrix3D.#parseKey(key);
			result.set(x, y, z, mapFunction(value, [x, y, z]));
		}
		return result;
	}

	mapAll(mapFunction) {
		const result = new this.constructor();
		this.forAll((value, [x, y, z]) => {
			result.set(x, y, z, mapFunction(value, [x, y, z]));
		});
		return result;
	}

	filter(filterFunction) {
		const result = new this.constructor();
		for (const [key, value] of this.#cells.entries()) {
			const [x, y, z] = InfiniteMatrix3D.#parseKey(key);
			if (filterFunction(value, [x, y, z])) {
				result.set(x, y, z, value);
			}
		}
		return result;
	}

	clone() {
		const clone = new this.constructor();
		clone.#cells = new Map(this.#cells);
		return clone;
	}

	slice(x1, y1, z1, x2, y2, z2) {
		return this.filter((value, [x, y, z]) => {
			return (
				x >= x1 && x <= x2 &&
				y >= y1 && y <= y2 &&
				z >= z1 && z <= z2
			);
		});
	}

	toString() {
		return [...this.#cells.entries()].map(([key, value]) => {
			return `${key}: ${value}`;
		}).join('\n');
	}

	static #buildKey(x, y, z) {
		return `${x}/${y}/${z}`;
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
				matrix.set(x, y, 0, rows[y][x]);
			}
		}
		return matrix;
	}

}
