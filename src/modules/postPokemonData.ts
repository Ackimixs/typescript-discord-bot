import PokemonModel, { PokemonInt } from "../database/models/PokemonModel";
import { IsenBot } from "../config/IsenBot";

export const postPokemonData = async (options: object, client: IsenBot): Promise<PokemonInt> => {
    const taskData = await PokemonModel.create(options);
    client.logger(['Database', 'post', 'pokemon data'], [])
    return taskData;
};
