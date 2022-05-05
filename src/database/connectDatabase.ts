import { connect } from "mongoose";
import { IsenBot } from "../utils/IsenBot";

export const connectDatabase = async (client: IsenBot) => {
    await connect(process.env.MONGO_URI as string);
    client.logger(['Database', 'status'], ['Database connected !'])
}
