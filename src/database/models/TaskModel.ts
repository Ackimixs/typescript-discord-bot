import { Document, model, Schema } from "mongoose";

export interface TaskInt extends Document {
    name: string;
    description: string;
    dueDate: number;
    author: string;
}

export const Task = new Schema({
    name: String,
    description: String,
    dueDate: Date,
    author: String,
});

export default model<TaskInt>('task', Task);
