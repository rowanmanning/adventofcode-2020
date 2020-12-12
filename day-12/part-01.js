
import getDirectoryName from '../shared/lib/get-directory-name.js';
import parseDirectionsFile from './lib/parse-directions-file.js';

(async () => {
	const inputPath = `${getDirectoryName(import.meta.url)}/input.txt`;

	// Load the directions
	const directions = await parseDirectionsFile(inputPath);

	// Count the result
	const coordinates = takeDirections(directions);
	console.log(Math.abs(coordinates.x) + Math.abs(coordinates.y));

	function takeDirections(directions) {
		let facing = 'E';
		let x = 0;
		let y = 0;
		for (const direction of directions) {
			const instruction = (direction.instruction === 'F' ? facing : direction.instruction);
			switch (instruction) {
				case 'N':
					y -= direction.value;
					break;
				case 'S':
					y += direction.value;
					break;
				case 'E':
					x += direction.value;
					break;
				case 'W':
					x -= direction.value;
					break;
				case 'L':
					facing = rotate(facing, direction.value);
					break;
				case 'R':
					facing = rotate(facing, -direction.value);
					break;
			}
		}
		return {x, y};
	}

	function rotate(currentDirection, angle) {
		let directions = ['E', 'N', 'W', 'S'];
		let steps = Math.abs(angle) / 90;
		while (steps) {
			const index = directions.indexOf(currentDirection);
			if (angle < 0) {
				currentDirection = directions[index - 1] ? directions[index - 1] : directions[3];
			} else {
				currentDirection = directions[index + 1] ? directions[index + 1] : directions[0];
			}
			steps -= 1;
		}
		return currentDirection;
	}

})();
