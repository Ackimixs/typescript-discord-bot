import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { postTaskData } from '../modules/postTaskData'
import { getTaskData } from '../modules/getTaskData'
import { valideDate} from '../utils/valideDate'

export const taskPost: Command = {
    data: new SlashCommandBuilder()
        .setName('task_post')
        .setDescription('post the task to do')
        .addStringOption(options =>
            options
                .setName('name')
                .setDescription('nom de la matiere')
                .setRequired(true)
        )
        .addStringOption(options =>
            options
                .setName('description')
                .setDescription('description')
                .setRequired(true)
        )
        .addStringOption(options =>
            options
                .setName('date')
                .setDescription('dd/mm/yyyy or dd/mm or dd')
                .setRequired(true)
        ),

    run: async (interaction) => {
        await interaction.deferReply()

        const taskName = interaction.options.getString('name')
        const taskDescription = interaction.options.getString('description')
        const taskDueDate = interaction.options.getString('date')
        const author = interaction.user.tag

        if (taskName === null || taskDescription === null || taskDueDate === null || author === null) {
            await interaction.editReply('impossible to see that message')
            return;
        }

        // date is real ?
        const dueDate = valideDate(taskDueDate)

        if (dueDate === null) {
            await interaction.editReply('respect dd/mm/yyyy or dd/mm or dd')
            return;
        }

        const taskDataExist = await getTaskData(taskName, dueDate)

        if (taskDataExist) {
            await interaction.editReply('task already exist')
            return;
        }

        const taskDataToPost = await postTaskData(taskName, taskDescription, dueDate, author)

        if (taskDataToPost) {
            await interaction.editReply('task post in the database')
            return;
        }
    }
}

















