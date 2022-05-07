import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { getTaskData } from '../modules/getTaskData'
import { validDate } from '../utils/validDate'

export const removeTask: Command = {
    data: new SlashCommandBuilder()
        .setName('remove_task')
        .setDescription('remove task')
        .addStringOption(options =>
            options
                .setName('name')
                .setDescription('name')
                .setRequired(true))
        .addStringOption(options =>
            options
                .setName('date')
                .setDescription('date')
                .setRequired(false)),

    run: async (interaction, client) => {
        await interaction.deferReply();
        const taskName = interaction.options.getString('name') as string
        const taskDate = interaction.options.getString('date')


        let options = {};
        if (taskDate) {
            const dueDate = validDate(taskDate)

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

        await taskData.remove()

        await interaction.editReply(`remove task : ${taskData.name}`)

    }
}
