import TaskModel, { TaskInt } from "../database/models/TaskModel";

export const getTaskData = async (options: object): Promise<TaskInt | null> => {
    const TaskData = await TaskModel.find(options)
    if (TaskData.length === 0) {
        return null;
    }
    else if (TaskData.length === 1) {
        return TaskData[0];
    }
    else {
        let firstTask = TaskData[0];
        for (let task of TaskData) {
            if (new Date(firstTask.dueDate) > new Date(task.dueDate)) {
                firstTask = task;
            }
        }
        return firstTask
    }
};
