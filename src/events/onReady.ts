import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/_CommandList";
import TaskModel from "../database/models/TaskModel";
import { IsenBot } from "../config/IsenBot";
const CronJob = require('cron').CronJob;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client: IsenBot) {
        const rest = new REST({ version: "9" }).setToken(
            process.env.BOT_TOKEN as string
        );

        const commandData = CommandList.map((command) => command.data.toJSON());

        const guilds = await client.guilds.fetch()
        for (let guild of guilds) {
            await rest.put(
                Routes.applicationGuildCommands(
                    client.user?.id || "missing token",
                    guild[1].id as string
                ),
                { body: commandData }
            );
        }


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


        await client.setAllGuilds(client)

        client.logger(['DiscordBot', 'status'], [`Connected on discord as ${client.user?.username}`])
    }
}
