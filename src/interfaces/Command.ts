import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"
import { CommandInteraction } from "discord.js"
import {IsenBot} from "../utils/IsenBot";


export interface Command {
    data:
        | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
        | SlashCommandSubcommandsOnlyBuilder;
    run: (interaction: CommandInteraction, client:IsenBot) => Promise<void>;
}
