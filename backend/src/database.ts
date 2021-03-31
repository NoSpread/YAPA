import Redis, { RedisClient } from 'redis'
import MySQL, { Pool } from 'mysql2/promise'
import { IRDBOptions, ISQLOptions } from './interfaces/IDBOptions'
import Crypto from 'crypto'
import Argon from 'argon2'
import { IDBKey, IDBUser, ILogin, IUserinformation } from "./interfaces/IDatabase";
import Logger from './logger'

/**
 * The main database class.
 * It holds all db commands needed for the REST API.
 */
class DB {

    private _redis: RedisClient
    private _mysql: Pool | null
    private _sqlOptions: ISQLOptions
    private _redisOptions: IRDBOptions

    private logger

    /**
     * This constructur initiated the DB class, sets the basic options and connects to the Redis DB
     * @param redis_options An object with redis specific options
     * @param mysql_options An object with mysql specific options
     */
    constructor(redis_options?: IRDBOptions, mysql_options?: ISQLOptions) {

        this.logger = new Logger()

        if (redis_options) {
            this._redisOptions = redis_options
        } else {
            this._redisOptions = {
                host: "localhost",
                db: 0,
                port: 6379
            }
        }

        if (mysql_options) {
            this._sqlOptions = mysql_options
        } else {
            this._sqlOptions = {
                host: "localhost",
                db: "yapa",
                user: "root",
                pass: "",
                port: 3306
            }
        }

        this._redis = Redis.createClient({
            host: this._redisOptions.host,
            db: this._redisOptions.db,
            port: this._redisOptions.port
        })

        this.logger.info("Redis Server connected")

        this._mysql = null
    }

    /**
     * This is initizialize the mysql pool
     */
    public async initSQL() {
        this._mysql = await MySQL.createPool({
            host: this._sqlOptions.host,
            database: this._sqlOptions.db,
            user: this._sqlOptions.user,
            password: this._sqlOptions.pass,
            port: this._sqlOptions.port
        })
        this.logger.info("MySQL Server connected")
    }

    /**
     * This function takes a key, value and a ttl value and stores it in the redis db as a cached value
     * @param key Key value for redis
     * @param value Value to store in the redis DB
     * @param ttl Time to live for an entry in the DB
     * @returns Returs a string from the redis db, eg. "OK"
     */
    public writeToCache(key: string | number, value: string, ttl?: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this._redis.set(String(key), value, (err, reply) => {
                if (err) reject(err)
                if (ttl) {
                    this._redis.expire(String(key), ttl, (err, treply) => {
                        if (err) reject(err)
                    })
                }
                resolve(reply)
            })
        })
    }

    /**
     * Read a value from the redis db
     * @param key Key value for redis
     * @returns The value associated with the key or null
     */
    public getFromCache(key: string | number): Promise<string|null> {
        return new Promise((resolve, reject) => {
            this._redis.get(String(key), (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    /**
     * Remove a key and its value from the cache (redis db)
     * @param key Key value for redis
     * @returns Value from redis delete
     */
    public delFromCache(key: string | number): Promise<number> {
        return new Promise((resolve, reject) => {
            this._redis.del(String(key), (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    /**
     * Read values from the redis db using a pattern
     * @param pattern A pattern to search for in the redis db
     * @returns A list of keys matched that pattern
     */
    public getKeysFromCache(pattern: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this._redis.keys(pattern, (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    /**
     * Creates a new user in the mysql db
     * @param username Username of a user, needs to be unique
     * @param password Password from a user
     * @returns True if succsessfull, false if not
     */
    public async createUser(username: string, password: string): Promise<boolean> {
        if (!this._mysql) throw new Error("MYSQL_NOTINITIALIZED")
        
        const hpassword = await Argon.hash(password, { type: Argon.argon2id, memoryCost: 2 ** 16, hashLength: 50})

        try {
            await this._mysql.execute('INSERT INTO `users` (username, password) VALUES(?, ?)', [username, hpassword])
            return true
        } catch(err) {
            if (err) throw err.code
        }

        return false
    }

    /**
     * Gets a user and returns all personal informations
     * @param userid UserID of the user to update
     * @returns IUserinformation - all personal informations
     */
    public async getUser(apikey: string): Promise<IUserinformation> {
        if (!this._mysql) throw new Error("MYSQL_NOTINITIALIZED")

        try {
            const [row] = await this._mysql.execute<IUserinformation[]>('SELECT i.* FROM `information`AS i LEFT JOIN `keys` AS k ON i.`id` = k.`id` WHERE k.`key` = ?', [apikey])
            
            if (row.length === 0) throw new Error("NO_INFORMATION")
            const user = row[0]

            return user

        } catch(err) {
            throw err
        }
    }

    public async getUserID(apikey: string): Promise<number> {
        if (!this._mysql) throw new Error("MYSQL_NOTINITIALIZED")

        try {
            const [row] = await this._mysql.execute<IUserinformation[]>('SELECT id FROM `keys` WHERE `key` = ?', [apikey])
            
            if (row.length === 0) throw new Error("USER_NOT_FOUND")
            const uid = row[0].id

            return uid

        } catch(err) {
            throw err
        }
    }

    /**
     * Updates the user information
     * @param info IUserinformation - all personal informations
     * @returns True if successfull
     */
    public async updateUser(info: IUserinformation): Promise<boolean> {
        if (!this._mysql) throw new Error("MYSQL_NOTINITIALIZED")
        if (!info.id) throw new Error("NO_USER_ID")

        try {
            await this._mysql.execute<IUserinformation[]>('INSERT INTO `information` (id, fullname, stocks, movement_type, workplaceCity, workplaceCode, workplaceStreet, voice, residenceCity, residenceCode, residenceStreet, workstart) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE fullname = ?, stocks = ?, movement_type = ?, workplaceCity = ?, workplaceCode = ?, workplaceStreet = ?, voice = ?, residenceCity = ?, residenceCode = ?, residenceStreet = ?, workstart = ?', [info.id, info.fullname, info.stocks, info.movement_type, info.workplaceCity, info.workplaceCode, info.workplaceStreet, info.voice, info.residenceCity, info.residenceCode, info.residenceStreet, info.workstart, info.fullname, info.stocks, info.movement_type, info.workplaceCity, info.workplaceCode, info.workplaceStreet, info.voice, info.residenceCity, info.residenceCode, info.residenceStreet, info.workstart])
            return true

        } catch(err) {
            throw err
        }
    }

    /**
     * This is the login function, it takes the username and his password and confirmes the argon hash
     * @param username Username of an already exsiting user
     * @param password Password of the given user in plain text
     * @returns null or and Login Interface with an API Key, Username and UID
     */
    public async verifyUser(username: string, password: string): Promise<null | ILogin> {
        if (!this._mysql) throw new Error("MYSQL_NOTINITIALIZED")

        try {
            const [row] = await this._mysql.execute<IDBUser[]>('SELECT u.`id`, u.`username`, u.`password`, k.`key` FROM `users` AS u LEFT JOIN `keys` AS k ON u.`id` = k.`id` WHERE u.`username` = ?', [username])
            
            if (row.length === 0) throw new Error("USER_NOT_FOUND")
            const phash = row[0].password
            const uid = row[0].id

            try {
                const hverify = await Argon.verify(phash, password)                
                if (hverify) {
                    const key = row[0].key ? row[0].key : await this.createAPIKey(uid)  
                    const user: ILogin = {
                        username: username,
                        id: uid,
                        api: key
                    }
                    this.writeToCache(key, JSON.stringify(user), 172800) // 48h lifetime

                    return user
                } else return null
                
            } catch(err) {
                if (!err.code) throw new Error("ARGON_FAIL")
                throw err
            }

        } catch(err) {
            if (err.code) throw err.code
        }

        return null
    }

    /**
     * Remove the API key from redis and the DB, invalidates the key
     * @param apikey Valid and active API key
     * @returns Boolean value according to its succsess
     */
    public async logoutUser(apikey: string): Promise<boolean> {
        if (!this._mysql) throw new Error("MYSQL_NOTINITIALIZED")

        const validKey = await this.verifyAPIKey(apikey)
        
        if (validKey) {
            try {
                this._mysql.execute('DELETE FROM `keys` WHERE `key` = ?', [apikey])
                this.delFromCache(apikey)
                return true
            } catch(err) {
                if (err) throw err
            }
        }
        return false
    }

    /**
     * Create a new API key
     * @param id The UID of an user
     * @returns A valid API key
     */
    private async createAPIKey(id: number): Promise<string> {
        if (!this._mysql) throw new Error("MYSQL_NOTINITIALIZED")
        
        const apikey = this.randomString()

        try {
            await this._mysql.execute('INSERT INTO `keys` (`id`, `key`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `key` = ?', [id, apikey, apikey])
        } catch(err) {
            if (err) throw err
        }

        return apikey
    }

    /**
     * Confirmes that the given key is really in the cache or db
     * @param apikey A given API key
     * @returns True if its a valid key, false if not
     */
    public async verifyAPIKey(apikey: string): Promise<boolean> {
        if (!this._mysql) throw new Error("MYSQL_NOTINITIALIZED")
        
        try {
            const cache = await this.getFromCache(apikey)

            if (!cache) {
                const [row] = await this._mysql.execute<IDBKey[]>('SELECT u.`id`, u.`username`, k.`key` FROM `keys`AS k, `users` AS u WHERE k.`key` = ?', [apikey])
                if (row.length === 0) throw new Error("KEY_NOT_FOUND")
                return true
            } else {
                return true
            }
        } catch(err) {
            if (err.code) throw err.code
        }
        return false
    }

    private randomString(size = 50) {  
        return Crypto
            .randomBytes(size)
            .toString('hex')
            .slice(0, size)
    }
}

/**
 * Setup of the global DB object.
 * Take options from the process environment and pass it to the DB class
 */
export default DB

const redis_options: IRDBOptions = {
    db: Number(process.env.REDIS_DB!),
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!)
}

const sql_options: ISQLOptions = {
    db: process.env.SQL_DB!,
    host: process.env.SQL_HOST!,
    pass: process.env.SQL_PASS!,
    port: Number(process.env.SQL_PORT!),
    user: process.env.SQL_USER!
}

const database = new DB(redis_options, sql_options)
export { database }