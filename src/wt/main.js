import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';

const __dirname = import.meta.dirname;
const workerPath = path.resolve(__dirname, 'worker.js');

const performCalculations = async () => {
    const numCPUs = os.cpus().length;
    const workers = new Array(numCPUs);
    const results = new Array(numCPUs);

    for (let i = 0; i < numCPUs; i++) {
        workers[i] = new Worker(workerPath);
        workers[i].postMessage(10 + i);
    }

    const promises = workers.map((worker, index) => {
        return new Promise((resolve, reject) => {
            worker.on('message', (result) => {
                results[index] = { status: 'resolved', data: result };
                resolve();
            });
            worker.on('error', (err) => {
                console.error(`Worker error: ${err}`);
                results[index] = { status: 'error', data: null };
                resolve();
            });
            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker stopped with exit code ${code}`);
                    results[index] = { status: 'error', data: null };
                    resolve();
                }
            });
        });
    });

    await Promise.all(promises);
    console.log(results);
};

await performCalculations();