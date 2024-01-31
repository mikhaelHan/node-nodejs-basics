import fs from 'fs/promises';
import path from 'path';
import { error } from 'console';

const __dirname = import.meta.dirname;


const copy = async () => {
    const direct = await fs.readdir(__dirname, { recursive: true, force: true });

    if (!direct.includes('files') || direct.includes('files_copy')) {
        throw new Error('FS operation failed');
    } else {
        await fs.mkdir(path.join(__dirname, 'files_copy'), { recursive: true });
        const filesArray = await fs.readdir(path.join(__dirname, 'files'));

        const copyPromises = filesArray.map(file => {
            const oldFile = path.join(__dirname, 'files', file);
            const newFile = path.join(__dirname, 'files_copy', file);

            return fs.copyFile(oldFile, newFile);
        });

        await Promise.all(copyPromises);
    }
};

try {
    await copy();
} catch (err) {
    error(`ERROR: ${err.message}`);
}
