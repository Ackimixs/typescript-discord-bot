import { Interaction } from 'discord.js';
import { CommandList } from '../commands/_CommandList';
import { logger } from '../utils/logger'

export const onInteraction = async (interaction: Interaction)=> {
    if (!interaction.isCommand()) return
    for (const Command of CommandList) {
        if (interaction.commandName === Command.data.name) {
            logger(['Discordbot', 'Command'], [interaction.commandName, `channel id : ${interaction.channelId}`, interaction.user.tag])
            await Command.run(interaction)
            break
        }
    }
};
