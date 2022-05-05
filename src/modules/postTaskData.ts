import TaskModel, { TaskInt } from "../database/models/TaskModel";
import { IsenBot } from "../config/IsenBot";

export const postTaskData = async (name: string, description: string, dueDate: Date, author: string, client: IsenBot): Promise<TaskInt> => {
    const taskData = await TaskModel.create({
            name: name,
            description: description,
            dueDate: dueDate,
            author: author,
    });
    client.logger(['Database', 'post', 'task'], [`name : ${name}`, `description : ${description}`, `due date : ${dueDate.toString()}`, `author : ${author}`])
    return taskData;
};
