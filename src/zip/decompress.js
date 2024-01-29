import fs from 'fs';
import path from 'path';
import { error } from 'console';
import zlib from 'zlib';

const __dirname = import.meta.dirname;

const readStream = fs.createReadStream(path.join(__dirname, 'files', 'archive.gz'));
const writeStream = fs.createWriteStream(path.join(__dirname, 'files', 'fileToCompress.txt'));
const decompressStream = zlib.createGunzip();

const handlerError = () => {
    console.log('DECOMPRESS operation failed...');
    readStream.destroy();
    writeStream.end('Finished with Error...')
}

const decompress = async () => {
    readStream
    .on('error', handlerError)
    .pipe(decompressStream)
    .pipe(writeStream)
    .on('error', handlerError);
};

try {
    await decompress();
} catch (err) {
    error(`ERROR: ${err.message}`);
}