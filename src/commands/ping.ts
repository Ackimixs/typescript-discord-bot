import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";

export const ping: Command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping'),

    run: async (interaction) => {
        await interaction.reply('pong')
    }
}
