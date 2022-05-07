import { Document, model, Schema } from "mongoose";

export interface PokemonUserInt extends Document {
    name: string;
    discordId: string;
    discordTag: string;
    Pokemon: string;
    dateAccountCreate: number;
}

export const PokemonUser = new Schema({
    name: String,
    discordId: String,
    discordTag: String,
    Pokemon: String,
    dateAccountCreate: Date,
});

export default model<PokemonUserInt>('pokemonUser', PokemonUser);
