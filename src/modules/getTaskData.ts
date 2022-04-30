import TaskModel, { TaskInt } from "../database/models/TaskModel";

export const getTaskData = async (name: string, dueDate: Date): Promise<TaskInt | null> => {
    const TaskData = await TaskModel.findOne({ name: name, dueDate: dueDate })
    return TaskData ? TaskData : null
};
