
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseDirectionsFile from './lib/parse-directions-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the directions
	const directions = await parseDirectionsFile(inputPath);

	// Count the result
	const coordinates = takeDirections(directions);
	console.log(coordinates);
	console.log(Math.abs(coordinates.x) + Math.abs(coordinates.y));

	function takeDirections(directions) {
		const ship = {
			x: 0,
			y: 0
		};
		let waypoint = {
			x: 10,
			y: -1
		};
		for (const direction of directions) {
			switch (direction.instruction) {
				case 'N':
					waypoint.y -= direction.value;
					break;
				case 'S':
					waypoint.y += direction.value;
					break;
				case 'E':
					waypoint.x += direction.value;
					break;
				case 'W':
					waypoint.x -= direction.value;
					break;
				case 'L':
					waypoint = rotate(waypoint, direction.value);
					break;
				case 'R':
					waypoint = rotate(waypoint, -direction.value);
					break;
				case 'F':
					ship.x += (waypoint.x * direction.value);
					ship.y += (waypoint.y * direction.value);
					break;
			}
		}
		return ship;
	}

	function rotate({x, y}, value) {
		let angle = Math.abs(value / 90);
		while (angle) {
			if (value > 0) {
				[x, y] = [y, -x];
			} else {
				[x, y] = [-y, x];
			}
			angle -= 1;
		}
		return {x, y};
	}

})();
