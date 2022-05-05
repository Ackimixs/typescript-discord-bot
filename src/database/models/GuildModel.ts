import { Document, model, Schema } from "mongoose";

export interface GuildInt extends Document {
    id: string;
    name: string;
    welcome: {
        channel: string;
        message: string;
    }
    goodBye: {
        channel: string;
        message: string;
    }
}

export const Guild = new Schema({
    id: String,
    name: String,
    welcome: {
        channel: String,
        message: String
    },
    goodBye: {
        channel: String,
        message: String
    }
});

export default model<GuildInt>('guild', Guild);
