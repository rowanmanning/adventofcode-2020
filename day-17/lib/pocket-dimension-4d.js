
import InfiniteMatrix4D from '../../shared/lib/infinite-matrix-4d.js';

// 3D pocket dimension
export default class PocketDimension4D extends InfiniteMatrix4D {

	neighbors(x, y, z, w) {
		const neighbors = this.slice(x - 1, y - 1, z - 1, w - 1, x + 1, y + 1, z + 1, w + 1);
		neighbors.delete(x, y, z, w);
		return neighbors;
	}

	expand(x = 1, y = 1, z = 1, w = 1) {
		const bounds = this.bounds;
		const clone = this.clone();
		clone.set(bounds.minX - x, bounds.minY - y, bounds.minZ - z, bounds.minW - w, PocketDimension4D.#STATE_INACTIVE);
		clone.set(bounds.maxX + x, bounds.maxY + y, bounds.maxZ + z, bounds.maxW + w, PocketDimension4D.#STATE_INACTIVE);
		return clone;
	}

	simulate(count = 1) {
		let result = this;
		while (count > 0) {
			result = result.expand().mapAll((value, [x, y, z, w]) => {
				const activeNeighbors = result.neighbors(x, y, z, w).populatedCellCount;
				if (value === PocketDimension4D.#STATE_ACTIVE) {
					if (activeNeighbors === 2 || activeNeighbors === 3) {
						return PocketDimension4D.#STATE_ACTIVE;
					} else {
						return PocketDimension4D.#STATE_INACTIVE;
					}
				} else {
					if (activeNeighbors === 3) {
						return PocketDimension4D.#STATE_ACTIVE;
					} else {
						return PocketDimension4D.#STATE_INACTIVE;
					}
				}
			});
			count -= 1;
		}
		return result;
	}

	toString() {
		const bounds = this.bounds;
		const matrix = [];
		for (let w = bounds.minW; w <= bounds.maxW; w += 1) {
			for (let z = bounds.minZ; z <= bounds.maxZ; z += 1) {
				const currentZ = [];
				for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
					const currentY = [];
					for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
						currentY.push(this.get(x, y, z, w) || ' ');
					}
					currentZ.push(currentY.join(''));
				}
				matrix.push(`z=${z}, w=${w}\n${currentZ.join('\n')}`);
			}
		}
		return matrix.join('\n\n');
	}

	static fromString(string) {
		const matrix = super.fromString(string);
		return matrix.filter(value => value === this.#STATE_ACTIVE);
	}

	static #STATE_ACTIVE = '#';
	static #STATE_INACTIVE = null;

}
