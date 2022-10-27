import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

rl.on('line', (input) => {
    fetch(`http://${process.env.RECEIVER}:${process.env.PORT}`, {
        method: "POST",
        body: JSON.stringify({message: `${new Date().toISOString()}: ${input}`}),
        headers: { 'Content-Type': 'application/json' }
    }).catch((error) => {
        console.log('Receiver not online')
    })
});
