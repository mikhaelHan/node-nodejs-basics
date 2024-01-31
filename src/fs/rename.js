import fs from 'fs/promises';
import path from 'path';
import { error } from 'console';

const __dirname = import.meta.dirname;


const rename = async () => {
    const direct = await fs.readdir(path.join(__dirname, 'files'), { recursive: true, force: true });

    if (!direct.includes('wrongFilename.txt') || direct.includes('properFilename.md')) {
        throw new Error('FS operation failed');
    } else {
        await fs.rename(path.join(__dirname, 'files', 'wrongFilename.txt'), path.join(__dirname, 'files', 'properFilename.md'));
    }
};


try {
    await rename();
} catch (err) {
    error(`ERROR: ${err.message}`);
}
