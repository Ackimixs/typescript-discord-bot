import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { getTaskData } from '../modules/getTaskData'
import { MessageEmbed } from "discord.js";
import { validDate } from '../utils/validDate'


export const taskGet: Command = {
    data:new SlashCommandBuilder()
        .setName('task_get')
        .setDescription('get task')
        .addStringOption(options =>
            options
                .setName('name')
                .setDescription('name')
                .setRequired(true))
        .addStringOption(options =>
            options
                .setName('date')
                .setDescription('dd/mm/yyyy or dd/mm or dd')
                .setRequired(false)),

    run: async (interaction, client) => {
        await interaction.deferReply()

        const taskName = interaction.options.getString('name') as string
        const taskDueDate = interaction.options.getString('date')


        let options = {};
        if (taskDueDate) {
            const dueDate = validDate(taskDueDate)

            if (dueDate === null) {
                await interaction.editReply('respect dd/mm/yyyy or dd/mm or dd')
                return;
            }

            options = { name: taskName, dueDate: dueDate, guildId: interaction.guildId }
        } else {
            options = { name: taskName, guildId: interaction.guildId }
        }


        const taskData = await getTaskData(options, client)

        if (!taskData) {
            await interaction.editReply('no task corresponding')
            return;
        }

        const embed = new MessageEmbed()
            .setTitle(taskData.name)
            .setDescription(taskData.description)
            .addField('for :', `${new Date(taskData.dueDate).getDate()}/${new Date(taskData.dueDate).getMonth()+1}/${new Date(taskData.dueDate).getFullYear()}`)

        await interaction.editReply({ embeds: [embed] })
    }
}
