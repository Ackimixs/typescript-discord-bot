import { Client } from "discord.js"
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase"
import { validateEnv } from "./utils/validateEnv"
import { onInteraction } from "./events/onInteraction";


(async () => {
    if (!validateEnv()) return;

    const client = new Client({intents: IntentOptions});

    await connectDatabase()


    client.on('ready', (client) =>
        console.log(`[DiscordBot] - Connected on discord as ${client.user.username}`)
    )

    client.on('interactionCreate', async (interaction) => {
        await onInteraction(interaction)
    })


    await client.login(process.env.BOT_TOKEN)
})();
