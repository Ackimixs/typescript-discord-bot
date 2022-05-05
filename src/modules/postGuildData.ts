import GuildModel, { GuildInt } from "../database/models/GuildModel";
import {IsenBot} from "../config/IsenBot";

export const postGuildData = async (options: object, client: IsenBot): Promise<GuildInt> => {
    const GuildData = await GuildModel.create(options);

    client.logger(['Database', 'post', 'guild'], ['result'])
    return GuildData;
};
