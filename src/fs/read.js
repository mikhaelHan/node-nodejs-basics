import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { error } from 'console';

const __dirname = import.meta.dirname;


const read = async () => {
    const direct = await fsp.readdir(path.join(__dirname, 'files'), { recursive: true, force: true });

    if (!direct.includes('fileToRead.txt')) {
        throw new Error('FS operation failed');
    } else {
        let data = '';

        const stream = fs.createReadStream(path.join(__dirname, 'files', 'fileToRead.txt'), 'utf-8');

        stream.on('data', chunk => data += chunk);
        stream.on('end', () => console.log(data));
        stream.on('error', () => new Error('FS operation failed'));
    }
};


try {
    await read();
} catch (err) {
    error(`ERROR: ${err.message}`);
}