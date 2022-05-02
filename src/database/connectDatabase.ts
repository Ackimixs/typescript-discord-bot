import { connect } from "mongoose";
import { logger } from '../utils/logger'

export const connectDatabase = async () => {
    await connect(process.env.MONGO_URI as string);
    logger(['Database', 'status'], ['Database connected !'])
}
