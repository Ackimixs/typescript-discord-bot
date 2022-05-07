import { Client, ClientOptions} from 'discord.js'
import { postGuildData } from '../modules/postGuildData'
import { getGuildData } from '../modules/getGuildData'
import GuildModel , { GuildInt } from "../database/models/GuildModel";

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

    async updateGuildParam() {
        this.guildParam = await GuildModel.find()
    }

    addGuild(guildData: GuildInt | null) {
        if (guildData) {
            this.guildParam.push(guildData)
        }
    }

    async setWelcomeMessage(guildId: string, welcomeChannelId: string, welcomeMessage: string, client: IsenBot) {
        const guild_1 = await client.guilds.fetch(guildId);
        if (!guild_1) return

        let welcomeChannel = guild_1.channels.fetch(welcomeChannelId)
        if (!welcomeChannel) return

        const guild_2 = await getGuildData({id: guildId}, client)
        if (!guild_2) return
        guild_2.welcome.channel = welcomeChannelId
        guild_2.welcome.message = welcomeMessage
        await postGuildData(guild_2, client)
        await this.updateGuildParam()
    }

    async setGoodbyeMessage(guildId: string, goodbyeChannelId: string, goodbyeMessage: string, client: IsenBot) {
        const guild = await client.guilds.fetch(guildId);
        if (!guild) return

        const welcomeChannel = await guild.channels.fetch(goodbyeChannelId)
        if (!welcomeChannel) return

        const guild_2 = await getGuildData({id: guildId}, client)
        if (!guild_2) return
        guild_2.goodBye.channel = goodbyeChannelId
        guild_2.goodBye.message = goodbyeMessage
        await postGuildData(guild_2, client)
        await this.updateGuildParam()
    }

    async newGuild(guildId: string, client: IsenBot) {
        const guild = client.guilds.fetch(guildId)
        if (!guild) return
        await postGuildData({id: guildId}, client)
    }

    async removeGuild(guildId: string, client: IsenBot) {
        const guildData = await getGuildData({id: guildId}, client)
        if(!guildData) return
        await guildData.remove()
    }
}
