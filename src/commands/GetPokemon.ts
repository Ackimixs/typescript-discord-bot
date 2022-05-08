import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { getPokemonData } from '../modules/getPokemonData'
import { MessageAttachment, MessageEmbed} from "discord.js";

export const get_pokemon: Command = {
    data: new SlashCommandBuilder()
        .setName('get_pokemon')
        .setDescription('get_pokemon')
        .addStringOption(options =>
            options
                .setName('name')
                .setDescription('Pokemon name')
                .setRequired(true)),

    run: async (interaction, client) => {
        await interaction.deferReply();
        const pokeName = interaction.options.getString('name')
        if (!pokeName) return;

        const pokeData = await getPokemonData({name: pokeName}, client);
        if (!pokeData) {
            await interaction.editReply('no pokemon in the database')
            return;
        }

        const file = new MessageAttachment(`./assets/pokeImage/${pokeData.name}.png`);

        const embed = new MessageEmbed()
            .setTitle(pokeData.name)
            .setDescription(`type : ${pokeData.type} | id : ${pokeData.id}`)
            .addFields(
                { name: 'PV', value: pokeData.speciality.PV.toString(), inline: true},
                { name: 'Att', value: pokeData.speciality.Att.toString(), inline: true},
                { name: 'Def', value: pokeData.speciality.Def.toString(), inline: true},
                { name: 'Vit', value: pokeData.speciality.Vit.toString(), inline: true},
                { name: 'Spe', value: pokeData.speciality.Spe.toString(), inline: true},
            )
            .setThumbnail(`attachment://${pokeData.name}.png`)

        await interaction.editReply({content: null, embeds: [embed], files: [file]})
    }
}
