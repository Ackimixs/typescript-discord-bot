import TaskModel, { TaskInt } from "../database/models/TaskModel";

export const postTaskData = async (name: string, description: string, dueDate: Date, author: string): Promise<TaskInt> => {
    return await TaskModel.create({
            name: name,
            description: description,
            dueDate: dueDate,
            author: author,
    });
};
