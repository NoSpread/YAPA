import chalk from 'chalk'
import moment from 'moment'

/**
 * This is the logger class, it simplefies the use of a logger
 */
class pLogger {

    public log(text: string): void {
        const timestamp = moment().format('HH:mm:ss')
        const logstring = chalk.grey(` * [${timestamp}]: ${text}`)
        
        console.log(logstring)
    }

    public error(text: string): void {
        const timestamp = moment().format('HH:mm:ss')
        const logstring = chalk.red(` - [${timestamp}]: ${text}`)
        
        console.error(logstring)
    }

    public info(text: string): void {
        const timestamp = moment().format('HH:mm:ss')
        const logstring = chalk.green(` + [${timestamp}]: ${text}`)
        
        console.info(logstring)
    }
}

export default pLogger