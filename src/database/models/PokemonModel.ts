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
        FirstEvo: {
            id: number;
            level: number;
        } | null;
        SecondEvoId: {
            id: number;
            level: number;
        } | null;
    }
    attack: {
        first: {
            name: string;
            attack: number;
            type: string;
            nbAttack: number;
            nbAttackLeft: number;
        } | null;
        second: {
            name: string;
            attack: number;
            type: string;
            nbAttack: number;
            nbAttackLeft: number;
        } | null;
        third: {
            name: string;
            attack: number;
            type: string;
            nbAttack: number;
            nbAttackLeft: number;
        } | null;
        fourth: {
            name: string;
            attack: number;
            type: string;
            nbAttack: number;
            nbAttackLeft: number;
        } | null;
    } | null;
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
        FirstEvoId: {
            id: Number,
            level: Number,
        },
        SecondEvoId: {
            id: Number,
            level: Number,
        },
    },
    attack: {
        first: {
            name: String,
            attack: Number,
            type: String,
            nbAttack: Number,
            nbAttackLeft: Number,
        },
        second: {
            name: String,
            attack: Number,
            type: String,
            nbAttack: Number,
            nbAttackLeft: Number,
        },
        third: {
            name: String,
            attack: Number,
            type: String,
            nbAttack: Number,
            nbAttackLeft: Number,
        },
        fourth: {
            name: String,
            attack: Number,
            type: String,
            nbAttack: Number,
            nbAttackLeft: Number,
        },
    }
},
{ typeKey: '$type' }
);

export default model<PokemonInt>('pokemon', Pokemon);
