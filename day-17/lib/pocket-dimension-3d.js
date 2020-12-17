
import InfiniteMatrix3D from '../../shared/lib/infinite-matrix-3d.js';

// 3D pocket dimension
export default class PocketDimension3D extends InfiniteMatrix3D {

	get activeCellCount() {
		return this.filter(value => value === PocketDimension3D.#STATE_ACTIVE).populatedCellCount;
	}

	neighbors(x, y, z) {
		const neighbors = this.slice(x - 1, y - 1, z - 1, x + 1, y + 1, z + 1);
		neighbors.delete(x, y, z);
		return neighbors;
	}

	expand(x = 1, y = 1, z = 1) {
		const bounds = this.bounds;
		const clone = this.clone();
		clone.set(bounds.minX - x, bounds.minY - y, bounds.minZ - z, PocketDimension3D.#STATE_INACTIVE);
		clone.set(bounds.maxX + x, bounds.maxY + y, bounds.maxZ + z, PocketDimension3D.#STATE_INACTIVE);
		return clone;
	}

	simulate(count = 1) {
		let result = this;
		while (count > 0) {
			result = result.expand().mapAll((value, [x, y, z]) => {
				const activeNeighbors = result
					.neighbors(x, y, z)
					.filter(cell => cell === PocketDimension3D.#STATE_ACTIVE)
					.populatedCellCount;
				if (value === PocketDimension3D.#STATE_ACTIVE) {
					if (activeNeighbors === 2 || activeNeighbors === 3) {
						return PocketDimension3D.#STATE_ACTIVE;
					} else {
						return PocketDimension3D.#STATE_INACTIVE;
					}
				} else {
					if (activeNeighbors === 3) {
						return PocketDimension3D.#STATE_ACTIVE;
					} else {
						return PocketDimension3D.#STATE_INACTIVE;
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
		for (let z = bounds.minZ; z <= bounds.maxZ; z += 1) {
			const currentZ = [];
			for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
				const currentY = [];
				for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
					currentY.push(this.get(x, y, z) || ' ');
				}
				currentZ.push(currentY.join(''));
			}
			matrix.push(`z=${z}\n${currentZ.join('\n')}`);
		}
		return matrix.join('\n\n');
	}

	static #STATE_ACTIVE = '#';
	static #STATE_INACTIVE = null;

}
