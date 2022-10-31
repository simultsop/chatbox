import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

var username : string;

const terminalInput = readline.createInterface({ input, output });
terminalInput.on('line', async(input) => {
    checkUsernameUpdate(input);
    const messageBody: MessageBody = constructMessage(input)
    await sendMessage(messageBody);
});

const constructMessage = (input:string) : MessageBody => {
    let message = new Date().toISOString();

    if(username) {
        message = `${message} [${username}]`;
    }

    return {
        message: `${message}: ${input}`
    } as MessageBody;
}

const checkUsernameUpdate = (input: string) => {
    if(input.includes('username=')) {
        username = input.replace('username=', '')
    }
}

interface MessageBody {
    message: string
}

const sendMessage = async (body: MessageBody) : Promise<any> => {
    try {
        return await fetch(`http://${process.env.RECEIVER}:${process.env.PORT}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log('Receiver not online');
        console.log(`Failed to send: ${body.message}`);
    }
}
