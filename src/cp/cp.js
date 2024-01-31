import { spawn } from 'child_process';

import path from 'path';
const __dirname = import.meta.dirname;
const scriptPath = path.resolve(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptPath, ...args], { stdio: ['pipe', 'pipe', 'inherit', 'ipc'] });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  child.on('exit', (code, signal) => {
    if (code) {
      console.log(`The process terminated with the code ${code}`);
    } else if (signal) {
      console.log(`The process was killed by a signal ${signal}`);
    }
  });
};


spawnChildProcess(['Argument1', 'Argument2']);