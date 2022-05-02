import TaskModel, { TaskInt } from "../database/models/TaskModel";
import { logger } from '../utils/logger'

export const getTaskData = async (options: object): Promise<TaskInt | null> => {
    const TaskData = await TaskModel.find(options)
    let firstTask: TaskInt | null;
    if (TaskData.length === 0) {
        firstTask = null;
    }
    else if (TaskData.length === 1) {
        firstTask = TaskData[0];
    }
    else {
        firstTask = TaskData[0];
        for (let task of TaskData) {
            if (new Date(firstTask.dueDate) > new Date(task.dueDate)) {
                firstTask = task;
            }
        }
    }

    let obj: string[] = []
    Object.entries(options).forEach(([key, value]) => {obj.push(`${key} : ${value}`)})
    obj.push(`result : ${TaskData.length}`)
    logger(['Database', 'get', 'task'], obj)
    return firstTask;
};
