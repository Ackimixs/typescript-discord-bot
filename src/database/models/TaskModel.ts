import { Document, model, Schema } from "mongoose";

export interface TaskInt extends Document {
    guildId: string;
    name: string;
    description: string;
    dueDate: number;
    author: string;
}

export const Task = new Schema({
    guildId: String,
    name: String,
    description: String,
    dueDate: Date,
    author: String,
});

export default model<TaskInt>('task', Task);
