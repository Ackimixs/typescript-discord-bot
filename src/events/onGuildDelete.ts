import {IsenBot} from "../config/IsenBot";
import {Guild} from "discord.js";

module.exports = {
    name: 'guildDelete',
    once: false,
    async execute(client: IsenBot, guild: Guild) {
        await client.removeGuild(guild.id, client)
        client.logger(['DiscordBot', 'status', 'guild'], ['guild remove', `guild id : ${guild.id}`])
    }
}
