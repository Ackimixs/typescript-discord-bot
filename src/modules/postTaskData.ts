import TaskModel, { TaskInt } from "../database/models/TaskModel";
import { IsenBot } from "../config/IsenBot";

export const postTaskData = async (guildId: string,name: string, description: string, dueDate: Date, author: string, client: IsenBot): Promise<TaskInt> => {
const taskData = await TaskModel.create({
            guildId: guildId,
            name: name,
            description: description,
            dueDate: dueDate,
            author: author,
    });
    client.logger(['Database', 'post', 'task'], [`guildID : ${guildId}`,`name : ${name}`, `description : ${description}`, `due date : ${dueDate.toString()}`, `author : ${author}`])
    return taskData;
};
