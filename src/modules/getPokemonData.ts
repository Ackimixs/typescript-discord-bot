import PokemonModel, { PokemonInt } from "../database/models/PokemonModel";
import { IsenBot } from "../config/IsenBot";

export const getPokemonData = async (options: object, client: IsenBot): Promise<PokemonInt | null> => {
    const PokemonData = await PokemonModel.findOne(options);

    client.logger(['Database', 'get', 'pokemon data'], [`pokemon name : ${PokemonData?.name}`])
    return PokemonData;
}
