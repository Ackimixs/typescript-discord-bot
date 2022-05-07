import { IsenBot } from './config/IsenBot'
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase"
import { validateEnv } from "./utils/validateEnv"
const fs = require('fs');

(async () => {
    if (!validateEnv()) return;

    const client = new IsenBot({intents: IntentOptions});


    //Events handler
    const eventFiles = fs.readdirSync('./prod/events/').filter((file: string) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, async (...args) => await event.execute(client, ...args));
        } else {
            client.on(event.name, async (...args) => await event.execute(client, ...args));
        }
    }

    await connectDatabase(client)

    await client.login(process.env.BOT_TOKEN)
})();
//TODO pokemon => todo file
