import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { error } from 'console';

const __dirname = import.meta.dirname;


const list = async () => {
    const folder = fs.existsSync(path.join(__dirname, 'files'));

    if (!folder) throw new Error('FS operation failed');

    const direct = await fsp.readdir(path.join(__dirname, 'files'), { recursive: true, force: true });

    const text = direct.reduce((acc, el, ind) => ind === direct.length - 1 ? `${acc} ${el} !` : `${acc} ${el}, `, 'Output: ');
    console.log(text);
};


try {
    await list();
} catch (err) {
    error(`ERROR: ${err.message}`);
}