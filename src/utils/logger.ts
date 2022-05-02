export const logger = (parameters: string[], info: string[]) => {
    let logMessage = '';
    parameters.forEach(parameter => {
        logMessage += `[${parameter}]`
    })
    info.forEach(info => {
        logMessage += ` - ${info}`
    })
    console.log(logMessage)
}
