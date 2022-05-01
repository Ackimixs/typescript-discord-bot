import TaskModel, { TaskInt } from "../database/models/TaskModel";

export const getTaskData = async (options: object): Promise<TaskInt | null> => {
    const TaskData = await TaskModel.findOne(options)
    return TaskData ? TaskData : null
};
