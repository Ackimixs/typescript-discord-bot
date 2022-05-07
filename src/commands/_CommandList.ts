import { Command } from "../interfaces/Command";
import fs from "fs";

const blacklist = ['_CommandList.js'];

export const CommandList: Command[] = []

const commandFiles = fs.readdirSync('./prod/commands/').filter((file: string) => file.endsWith('.js') && !blacklist.includes(file));

for (const file of commandFiles) {
    const command = require(`./${file}`)
    const key = Object.values(command)[0]
    CommandList.push(<Command>key)
}
