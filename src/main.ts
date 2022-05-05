import { IsenBot } from './utils/IsenBot'
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase"
import { validateEnv } from "./utils/validateEnv"
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";

(async () => {
    if (!validateEnv()) return;

    const client = new IsenBot({intents: IntentOptions});

    client.on('ready', async () => await onReady(client))

    client.on('interactionCreate', async (interaction) => await onInteraction(interaction, client))

    await connectDatabase(client)

    await client.login(process.env.BOT_TOKEN)
})();
