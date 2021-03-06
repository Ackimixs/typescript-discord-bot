import { Interaction } from 'discord.js';
import { CommandList } from '../commands/_CommandList';
import {IsenBot} from "../config/IsenBot";

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client: IsenBot, interaction: Interaction) {
        if (!interaction.isCommand()) return
        for (const Command of CommandList) {
            if (interaction.commandName === Command.data.name) {
                client.logger(['Discordbot', 'Command'], [interaction.commandName, `channel id : ${interaction.channelId}`, interaction.user.tag])
                await Command.run(interaction, client)
            }
        }
    }
}
