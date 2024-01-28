import fs from 'fs/promises';
import path from 'path';
import { error } from 'console';

const __dirname = import.meta.dirname;

const remove = async () => {
    const direct = await fs.readdir(path.join(__dirname, 'files'), { recursive: true, force: true });

    if (!direct.includes('fileToRemove.txt')) {
        throw new Error('FS operation failed');
    } else {
        await fs.unlink(path.join(__dirname, 'files', 'fileToRemove.txt'));
    }
};


try {
    await remove();
} catch (err) {
    error(`ERROR: ${err.message}`);
}