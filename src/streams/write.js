import fs from 'fs';
import path from 'path';
import { error } from 'console';

const __dirname = import.meta.dirname;
const { stdin, stdout } = process;


const write = async () => {
    const stream = fs.createWriteStream(path.join(__dirname, 'files', 'fileToWrite.txt'));

    stdout.write('Please enter text... \n');

    stdin.on('data', (data) => {
        const text = data.toString().trim();

        if (text === 'exit' || text === 'quit') {
            stdout.write('Good bye!!!');
            process.exit();
        }

        stream.write(`${text} \n`)
    });

    process.on(('SIGINT'), () => {
        stdout.write('Good bye!!!');
        process.exit();
    });
};

try {
    await write();
} catch (err) {
    error(`ERROR: ${err.message}`);
}