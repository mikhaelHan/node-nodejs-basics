import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const __dirname = import.meta.dirname;

const calculateHash = async () => {

  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(path.join(__dirname, 'files', 'fileToCalculateHashFor.txt'), 'utf-8');

  stream.on('data', (data) => hash.update(data));
  stream.on('end', () => {
    const result = hash.digest('hex');
    console.log(`SHA256 hash is: ${result}`);
  });
  stream.on('error', () => new Error('Calculates SHA256 hash operation failed'));

};

await calculateHash();