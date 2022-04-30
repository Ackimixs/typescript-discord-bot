import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { getTaskData } from '../modules/getTaskData'
import { MessageEmbed } from "discord.js";
import { valideDate } from '../utils/valideDate'


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
                .setRequired(true)),

    run: async (interaction) => {
        await interaction.deferReply()

        const taskName = interaction.options.getString('name')
        const taskDueDate = interaction.options.getString('date')


        if (taskName===null || taskDueDate===null) {
            await interaction.editReply('THAT IMPOSSIBLE')
            return;
        }

        const dueDate = valideDate(taskDueDate)

        if (dueDate === null) {
            await interaction.editReply('respect dd/mm/yyyy or dd/mm or dd')
            return;
        }

        const taskData = await getTaskData(taskName, dueDate)

        if (!taskData) {
            await interaction.editReply('no task corresponding')
            return;
        }

        const embed = new MessageEmbed()
            .setTitle(taskData.name)
            .setDescription(taskData.description)
            .addField('for :', `${dueDate.getDate()}/${dueDate.getMonth()+1}/${dueDate.getFullYear()}`)

        await interaction.editReply({ embeds: [embed] })
    }
}
