import { Client } from "discord.js";
import { REST } from "@discordjs/rest"

export const onReady = async (client: Client) => {
    const rest = new REST({ version: "9" }).setToken(
        process.env.BOT_TOKEN as string
    );

};
