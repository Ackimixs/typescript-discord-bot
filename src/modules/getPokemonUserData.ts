import PokemonUserModel, { PokemonUserInt } from "../database/models/PokemonUserModel";
import { IsenBot } from "../config/IsenBot";

export const getPokemonUserData = async (options: object, client: IsenBot): Promise<PokemonUserInt | null> => {
    const PokemonUser = await PokemonUserModel.findOne(options);

    client.logger(['Database', 'get', 'pokemon user'], [`user id : ${PokemonUser?.discordTag}`])
    return PokemonUser;
}
