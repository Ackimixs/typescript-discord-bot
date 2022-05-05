import GuildModel, { GuildInt } from "../database/models/GuildModel";
import {IsenBot} from "../config/IsenBot";

export const getGuildData = async (options: object, client: IsenBot): Promise<GuildInt | null> => {
    const GuildData = await GuildModel.findOne(options);

    client.logger(['Database', 'get', 'guild'], ['result'])
    return GuildData;
}
