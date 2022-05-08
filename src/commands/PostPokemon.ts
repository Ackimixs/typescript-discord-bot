import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import {postPokemonData} from "../modules/postPokemonData";

export const post_pokemon: Command = {
    data: new SlashCommandBuilder()
        .setName('post_pokemon')
        .setDescription('post_pokemon'),


    run: async (interaction, client) => {
        await interaction.deferReply();

        let options = {
            id: 8,
            name: 'Carabaffe',
            level: 16,
            xp: 0,
            speciality: {
                PV: 59,
                Att: 63,
                Def: 80,
                Vit: 58,
                Spe: 70
            },
            type: 'eau',
            evo: {
                FirstEvoId: {
                    id: 9,
                    level: 36
                },
                SecondEvoId: null
            },
            attack: {
                first: {
                    name: 'Charge',
                    attack: 12,
                    type: 'normal',
                    nbAttack: 30,
                    nbAttackLeft: 30
                },
                second: {
                    name: 'Pistolet à O',
                    attack: 17,
                    type: 'eau',
                    nbAttack: 18,
                    nbAttackLeft: 18
                },
                third: {
                    name: 'Hydro-Queue',
                    attack: 25,
                    type: 'eau',
                    nbAttack: 12,
                    nbAttackLeft: 12
                },
                fourth: {
                    name: 'Hydrocanon',
                    attack: 47,
                    type: 'eau',
                    nbAttack: 7,
                    nbAttackLeft: 7
                }
            }
        }

        const pokeData = await postPokemonData(options, client);
        if (!pokeData) {
            await interaction.editReply('error failure when post in the database')
            return;
        }
        //console.log(pokeData)
        await interaction.editReply('pokemon post')
    }
}
