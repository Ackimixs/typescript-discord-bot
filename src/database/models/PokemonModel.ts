import { Document, model, Schema } from "mongoose";

export interface PokemonInt extends Document {
    id: number;
    name: string;
    level: number;
    xp: number;
    speciality: {
        PV: number;
        Att: number;
        Def: number;
        Vit: number;
        Spe: number;
    }
    type: string;
    evo: {
        firstEvoId: number;
        SecondEvoId: number;
    }
    attack: {
        first: {
            name: string;
            attack: number;
            type: string;
        }
        second: {
            name: string;
            attack: number;
            type: string;
        }
        third: {
            name: string;
            attack: number;
            type: string;
        }
        fourth: {
            name: string;
            attack: number;
            type: string;
        }
    }
}

export const Pokemon = new Schema({
    id: Number,
    name: String,
    level: Number,
    xp: Number,
    speciality: {
        PV: Number,
        Att: Number,
        Def: Number,
        Vit: Number,
        Spe: Number,
    },
    type: String,
    evo: {
        firstEvoId: Number,
        SecondEvoId: Number,
    },
    attack: {
        first: {
            name: String,
            attack: Number,
            type: String
        },
        second: {
            name: String,
            attack: Number,
            type: String
        },
        third: {
            name: String,
            attack: Number,
            type: String
        },
        fourth: {
            name: String,
            attack: Number,
            type: String
        },
    }
});

export default model<PokemonInt>('pokemon', Pokemon);
