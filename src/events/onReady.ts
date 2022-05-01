import { Client } from "discord.js";
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/_CommandList";
import TaskModel from "../database/models/TaskModel";
const CronJob = require('cron').CronJob;

export const onReady = async (client: Client) => {
    const rest = new REST({ version: "9" }).setToken(
        process.env.BOT_TOKEN as string
    );

    const commandData = CommandList.map((command) => command.data.toJSON());

    await rest.put(
        Routes.applicationGuildCommands(
            client.user?.id || "missing token",
            process.env.GUILD_ID as string
        ),
        { body: commandData }
    );

    const checkTask = new CronJob(
        '30 23 * * *',
        async () => {
            const TaskData = await TaskModel.find()
            TaskData.forEach((task) => {
                if (new Date(task.dueDate) < new Date()) {
                    task.remove()
                    console.log(`remove task : ${task.name}\n due date : ${task.dueDate}`)
                }
            })
        }
    )
    checkTask.start()


    console.log(`[DiscordBot] - Connected on discord as ${client.user?.username}`)
};
