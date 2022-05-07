import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";

export const setWelcomeMessage: Command = {
    data: new SlashCommandBuilder()
        .setName('set_welcome')
        .setDescription('set welcome message & channel')
        .addChannelOption(options =>
            options
                .setName('channel')
                .setDescription('channel to say welcome')
                .setRequired(true))
        .addStringOption(options =>
            options
                .setName('message')
                .setDescription('message to say welcome')
                .setRequired(true)),

    run: async (interaction, client) => {
        await interaction.deferReply()
        const guildId = interaction.guildId;
        const channelId = interaction.options.getChannel('channel')?.id
        if(!channelId || !guildId) {
            await interaction.editReply('error')
            return
        }

        const channel = await client.channels.fetch(channelId)
        if (!channel?.isText()) {
            await interaction.editReply('error please selected valid channel')
            return;
        }

        const message = interaction.options.getString('message') as string
        await client.setWelcomeMessage(guildId, channel.id, message, client)
        await interaction.editReply('message set')
    }
}
