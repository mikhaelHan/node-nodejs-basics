import fs from 'fs/promises';
import path from 'path';
import { error } from 'console';

const __dirname = import.meta.dirname;

const create = async () => {
    const direct = await fs.readdir(path.join(__dirname, 'files'), { recursive: true, force: true });

    if (direct.includes('fresh.txt')) {
        throw new Error('FS operation failed');
    } else {
        const text = 'I am fresh and young';
        await fs.writeFile(path.join(__dirname, 'files', 'fresh.txt'), text, () => { })
    }
};

try {
    await create();
} catch (err) {
    error(`ERROR: ${err.message}`);
}
