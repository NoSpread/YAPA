import Redis, { RedisClient } from 'redis'
import MySQL, { Pool } from 'mysql2/promise'
import { IRDBOptions, ISQLOptions } from './interfaces/IDBOptions'
import Crypto from 'crypto'
import Argon from 'argon2'
import { IDBKey, IDBUser, IKey, ILogin } from "./interfaces/IDatabase";
import Logger from './logger'

class DB {

    private _redis: RedisClient
    private _mysql: Pool | null
    private _sqlOptions: ISQLOptions
    private _redisOptions: IRDBOptions

    private logger

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

    public getFromCache(key: string | number): Promise<string|null> {
        return new Promise((resolve, reject) => {
            this._redis.get(String(key), (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    public delFromCache(key: string | number): Promise<number> {
        return new Promise((resolve, reject) => {
            this._redis.del(String(key), (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    public getKeysFromCache(pattern: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this._redis.keys(pattern, (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    public async createUser(username: string, password: string): Promise<boolean> {
        if (!this._mysql) throw new Error("MYSQL ERROR: not initialized")
        
        const hpassword = await Argon.hash(password, { type: Argon.argon2id, memoryCost: 2 ** 16, hashLength: 50})

        try {
            await this._mysql.execute('INSERT INTO `users` (username, password) VALUES(?, ?)', [username, hpassword])
            return true
        } catch(err) {
            if (err) throw err.code
        }

        return false
    }

    public async verifyUser(username: string, password: string): Promise<null | ILogin> {
        if (!this._mysql) throw new Error("MYSQL ERROR: not initialized")

        try {
            const [row] = await this._mysql.execute<IDBUser[]>('SELECT `id`, `username`, `password` FROM `users` WHERE `username` = ?', [username])
            
            if (row.length === 0) throw {code: "USER_NOT_FOUND"}
            const phash = row[0].password
            const uid = row[0].id

            try {
                const hverify = await Argon.verify(phash, password)
                const keys = await this.createAPIKey(uid)
                
                if (hverify) {
                    const user: ILogin = {
                        username: username,
                        id: uid,
                        api: keys.db
                    }
                    this.writeToCache(uid, JSON.stringify(user), 172800) // 48h lifetime
                    user.api = keys.user // change to unhashed version for user

                    return user
                } else return null
                
            } catch(err) {
                if (!err.code) throw {code: "ARGON_FAIL"}
                throw err
            }

        } catch(err) {
            if (err.code) throw err.code
        }

        return null
    }

    public async logoutUser(login: ILogin): Promise<boolean> {
        if (!this._mysql) throw new Error("MYSQL ERROR: not initialized")

        const validKey = await this.verifyAPIKey(login)
        
        if (validKey) {
            try {
                this._mysql.execute('DELETE FROM `keys` WHERE id = ?', [login.id])
                this.delFromCache(login.id)
                return true
            } catch(err) {
                if (err) throw err
            }
        }
        return false
    }

    private async createAPIKey(id: number): Promise<IKey> {
        if (!this._mysql) throw new Error("MYSQL ERROR: not initialized")
        
        const apikey = this.randomString()
        const hapikey = await Argon.hash(apikey, { type: Argon.argon2id, memoryCost: 2 ** 16, hashLength: 50})

        try {
            await this._mysql.execute('INSERT INTO `keys` (`id`, `key`) VALUES(?, ?)', [id, hapikey])
        } catch(err) {
            if (err) throw err
        }

        return { user: apikey, db: hapikey }
    }

    // TODO Make actually usefull -> actually check for the apikey
    public async verifyAPIKey(login: ILogin): Promise<boolean> {
        if (!this._mysql) throw new Error("MYSQL ERROR: not initialized")
        
        try {
            // TODO Save API KEY as KEY in redis? 
            const cache = await this.getFromCache(String(login.id))
            let dbkey

            if (!cache) {
                const [row] = await this._mysql.execute<IDBKey[]>('SELECT u.`id`, u.`username`, k.`key` FROM `keys`AS k, `users` AS u WHERE u.`username` = ?', [login.username])
                if (row.length === 0) throw new Error("User not found")
    
                dbkey = row[0].key
            } else {
                const parsed: ILogin = JSON.parse(cache)
                dbkey = parsed.api
            }

            try {
                const hverify = await Argon.verify(dbkey, login.api)
                return hverify
                
            } catch(err) {
                if (!err.code) throw {code: "ARGON_FAIL"}
                throw err
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

export default DB

const database = new DB()
export { database }