import fs from 'fs';
import path from 'path';
import { error } from 'console';
import zlib from 'zlib';

const __dirname = import.meta.dirname;

const readStream = fs.createReadStream(path.join(__dirname, 'files', 'fileToCompress.txt'));
const writeStream = fs.createWriteStream(path.join(__dirname, 'files', 'archive.gz'));
const compressStream = zlib.createGzip();


const handlerError = () => {
    console.log('TRANSFORM peration failed...');
    readStream.destroy();
    writeStream.end('Finished with Eror...')
}

const compress = async () => {
    readStream
    .on('error', handlerError)
    .pipe(compressStream)
    .pipe(writeStream)
    .on('error', handlerError);
};

try {
    await compress();
} catch (err) {
    error(`ERROR: ${err.message}`);
}
