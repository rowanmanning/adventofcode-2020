
import Matrix from '../../shared/lib/matrix.js';

export default class ChairMatrix extends Matrix {

	static EMPTY_CHAIR = 'L';
	static FLOOR = '.';
	static OCCUPIED_CHAIR = '#';

	fill(accountForSeatVisibility = false) {
		this.map((value, [x, y]) => {
			if (value === this.constructor.FLOOR) {
				return value;
			}

			let occupiedNeighbors;
			if (accountForSeatVisibility) {
				occupiedNeighbors = this.getOccupiedNeighborsBySight(x, y);
			} else {
				occupiedNeighbors = this.getOccupiedNeighbors(x, y);
			}
			const allowedOccupiedNeighbors = (accountForSeatVisibility ? 5 : 4);

			if (value === this.constructor.EMPTY_CHAIR && occupiedNeighbors === 0) {
				return this.constructor.OCCUPIED_CHAIR;
			}

			if (value === this.constructor.OCCUPIED_CHAIR && occupiedNeighbors >= allowedOccupiedNeighbors) {
				return this.constructor.EMPTY_CHAIR;
			}

			return value;
		});
		return this;
	}

	fillUntilStable(accountForSeatVisibility = false) {
		let previous;
		let fillCount = 0;
		console.time(`Step ${fillCount}`);
		while (previous !== this.toString()) {
			previous = this.toString();
			this.fill(accountForSeatVisibility);
			console.timeEnd(`Step ${fillCount}`);
			fillCount += 1;
			console.time(`Step ${fillCount}`);
		}
		return fillCount - 1;
	}

	getOccupiedNeighbors(x, y) {
		return this.getNeighbors(x, y).filter(cell => {
			return cell === this.constructor.OCCUPIED_CHAIR;
		}).length;
	}

	getOccupiedNeighborsBySight(x, y) {
		return [
			this.hasOccupiedNeighborInPath(x, y, -1, -1),
			this.hasOccupiedNeighborInPath(x, y, -1, 0),
			this.hasOccupiedNeighborInPath(x, y, -1, 1),
			this.hasOccupiedNeighborInPath(x, y, 0, -1),
			this.hasOccupiedNeighborInPath(x, y, 0, 1),
			this.hasOccupiedNeighborInPath(x, y, 1, -1),
			this.hasOccupiedNeighborInPath(x, y, 1, 0),
			this.hasOccupiedNeighborInPath(x, y, 1, 1)
		].filter(value => value === true).length;
	}

	hasOccupiedNeighborInPath(x, y, stepX, stepY) {
		const path = this.getPath(x + stepX, y + stepY, stepX, stepY);
		for (const value of path) {
			if (value === 'L') {
				return false;
			}
			if (value === '#') {
				return true;
			}
		}
		return false;
	}

	countOccupiedSeats() {
		return this.count(value => {
			return value === this.constructor.OCCUPIED_CHAIR;
		});
	}

}
