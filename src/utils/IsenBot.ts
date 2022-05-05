import { Client, ClientOptions} from 'discord.js'

export class IsenBot extends Client {
    constructor(options: ClientOptions) {
        super(options);
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

}
