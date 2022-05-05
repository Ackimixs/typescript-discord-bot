import { IsenBot } from './config/IsenBot'
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase"
import { validateEnv } from "./utils/validateEnv"
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
import {onGuildMemberAdd} from "./events/onGuildMemberAdd";

(async () => {
    if (!validateEnv()) return;

    const client = new IsenBot({intents: IntentOptions});

    client.once('ready', async () => await onReady(client))

    client.on('interactionCreate', async (interaction) => await onInteraction(interaction, client))

    client.on('guildMemberAdd', async (member) => await onGuildMemberAdd(member, client))

    await connectDatabase(client)

    await client.login(process.env.BOT_TOKEN)
})();
