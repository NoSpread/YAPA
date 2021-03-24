import { database } from '../../database'
import Logger from '../../logger'
import { ILogin } from '../../interfaces/IDatabase'


class UserModel {

    private logger

    constructor() {
        this.logger = new Logger()
    }

    /**
     * Register a user in the DB
     * @param username Username to register
     * @param password Password to use for the account
     * @returns Status code
     */
    public register = async (username: string, password: string): Promise<number> => {
        try {
            const success = await database.createUser(username, password)
            if (success) return 201
            else return 409
        } catch(err) {
            this.logger.error(err)
            return 500
        }
    }

    /**
     * Login a user
     * @param username Username to login
     * @param password Password of the username
     * @returns Login Object or null if failed
     */
    public login = async (username: string, password: string): Promise<ILogin | null> => {
        const user = await database.verifyUser(username, password)
        if (user) return user
        else return null
    }

    /**
     * Logout a user
     * @param apikey Valid API Key
     * @returns Boolean depended on succsess
     */
    public logout = async (apikey: string): Promise<boolean> => {
        const status = await database.logoutUser(apikey)
        if (status) return true
        else return false
    }
}

export default UserModel