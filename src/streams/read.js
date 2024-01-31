import fs from 'fs';
import path from 'path';
import { error } from 'console';

const __dirname = import.meta.dirname;
const { stdout } = process;

const read = async () => {
    let data = '';

    const stream = fs.createReadStream(path.join(__dirname, 'files', 'fileToRead.txt'), 'utf-8');

    stream.on('data', chunk => data += chunk);
    stream.on('end', () => stdout.write(data));
    stream.on('error', () => new Error('Reading operation failed'));
};

try {
    await read();
} catch (err) {
    error(`ERROR: ${err.message}`);
}