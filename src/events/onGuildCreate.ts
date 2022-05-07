import {IsenBot} from "../config/IsenBot";
import {Guild} from "discord.js";
import {CommandList} from "../commands/_CommandList";
import {Routes} from "discord-api-types/v9";
import {REST} from "@discordjs/rest";

module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(client: IsenBot, guild: Guild) {
        await client.newGuild(guild, client)
        client.logger(['DiscordBot', 'status', 'guild'], ['guild add', `guild id : ${guild.id}`])



        const rest = new REST({ version: "9" }).setToken(
            process.env.BOT_TOKEN as string
        );

        const commandData = CommandList.map((command) => command.data.toJSON());

        const guilds = await client.guilds.fetch()
        for (let guild of guilds) {
            await rest.put(
                Routes.applicationGuildCommands(
                    client.user?.id || "missing token",
                    guild[1].id as string
                ),
                { body: commandData }
            );
        }

    }
}
