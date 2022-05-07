import {GuildMember, TextChannel} from "discord.js";
import {IsenBot} from "../config/IsenBot";
module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client: IsenBot, member: GuildMember) {
        client.logger(["DiscordBot", "Event", "GuildMemberAdd"], [`member : ${member.user.tag}`])
        const guildID = member.guild.id
        const guildData = client.guildParam.find(e => e.id === guildID)
        if (!guildData || !guildData.welcome) return
        const channel = await client.channels.fetch(guildData.welcome.channel) as TextChannel
        channel?.send(guildData.welcome.message + member.user.tag)
    }
}
