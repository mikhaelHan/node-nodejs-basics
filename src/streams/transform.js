import { error } from 'console';
import { Transform } from 'stream';

const { stdin, stdout } = process;

const transformStream = new Transform({
  transform(chunk, _, callback) {
    this.push(chunk.toString().split('').reverse().join('') + '\n');
    callback();
  }
});

const transform = async () => {
  stdout.write('Please enter text... \n');

  stdin.pipe(transformStream).pipe(stdout);

  process.on(('SIGINT'), () => {
    stdout.write('Good bye!!!');
    process.exit();
  });
};


try {
  await transform();
} catch (err) {
  error(`ERROR: ${err.message}`);
}
