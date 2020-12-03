
import {dirname} from 'path';
import {fileURLToPath} from 'url';

export default function directoryName(fileUrl) {
	return dirname(fileURLToPath(fileUrl));
}
