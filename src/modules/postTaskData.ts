import TaskModel, { TaskInt } from "../database/models/TaskModel";
import { logger } from '../utils/logger'

export const postTaskData = async (name: string, description: string, dueDate: Date, author: string): Promise<TaskInt> => {
    const taskData = await TaskModel.create({
            name: name,
            description: description,
            dueDate: dueDate,
            author: author,
    });
    logger(['Database', 'post', 'task'], [`name : ${name}`, `description : ${description}`, `due date : ${dueDate.toString()}`, `author : ${author}`])
    return taskData
};
