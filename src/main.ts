import { Client } from "discord.js"
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase"
import { validateEnv } from "./utils/validateEnv"
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";

(async () => {
    if (!validateEnv()) return;

    const client = new Client({intents: IntentOptions});

    client.on('ready', async () => await onReady(client))

    client.on('interactionCreate', async (interaction) => await onInteraction(interaction))

    await connectDatabase()

    await client.login(process.env.BOT_TOKEN)
})();
