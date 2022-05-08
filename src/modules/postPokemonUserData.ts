import PokemonUserModel, { PokemonUserInt } from "../database/models/PokemonUserModel";
import { IsenBot } from "../config/IsenBot";

export const postPokemonUserData = async (options: PokemonUserInt, client: IsenBot): Promise<PokemonUserInt> => {
    const taskData = await PokemonUserModel.create(options);
    client.logger(['Database', 'post', 'pokemon data'], [`discord user : ${options.discordTag}`])
    return taskData;
};
