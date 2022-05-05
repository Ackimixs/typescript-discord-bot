import { Client, ClientOptions} from 'discord.js'
import { postGuildData } from '../modules/postGuildData'
import { getGuildData } from '../modules/getGuildData'
import { GuildInt } from "../database/models/GuildModel";

export class IsenBot extends Client {
    public guildParam: GuildInt[];
    constructor(options: ClientOptions) {
        super(options);
        this.guildParam = [];
    }
    logger(parameters: string[], info: string[]): void  {
        let logMessage = '';
        parameters.forEach(parameter => {
            logMessage += `[${parameter}]`
        })
        info.forEach(info => {
            logMessage += ` - ${info}`
        })
        console.log(logMessage)
    }

    async setAllGuilds(client: IsenBot) {
        const guilds = await client.guilds.fetch()
        for (let guild of guilds) {
            let guildData = await getGuildData({id: guild[0]}, client) || await postGuildData({id: guild[0]}, client)
            this.addGuild(guildData)
        }
    }

    addGuild(guildData: GuildInt | null) {
        if (guildData) {
            this.guildParam.push(guildData)
        }
    }

    async setWelcomeMessage(guild: GuildInt, welcomeChannelId: string, welcomeMessage: string, client: IsenBot) {
        const guild_1 = await client.guilds.fetch(guild.id);
        if (!guild_1) return

        let welcomeChannel = guild_1.channels.fetch(welcomeChannelId)
        if (!welcomeChannel) return

        const guild_2 = await getGuildData({id: '968595163700162560'}, client) as GuildInt
        guild_2.welcome.channel = welcomeChannelId
        guild_2.welcome.message = welcomeMessage
        await postGuildData(guild_2, client)
    }

    /*async getFromDB(options: object, client: IsenBot) {
        const guildData = await getGuildData(options, client)
        this.addGuild(guildData)
        this.logger(["Database", "get", "GuildData"], [''])
    }*/

    /*async postToDB(client: IsenBot) {
        for (const guildOptions of this.guildParam) {
            const guildData = await postGuildData(guildOptions, client)
            this.logger(["Database", "post", "GuildData"], [`guild id : ${guildData.id}`])
        }
    }*/
}
