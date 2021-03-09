import redis, { RedisClient } from 'redis'
import mysql, { Pool, RowDataPacket } from 'mysql2/promise'
import { IRDBOptions, ISQLOptions } from './interfaces/IDBOptions'
import argon from 'argon2'

interface IUser extends RowDataPacket {
    id: number,
    username: string,
    password: string
}

class DB {

    private _redis: RedisClient
    private _mysql: Pool | null
    private _sqlOptions: ISQLOptions
    private _redisOptions: IRDBOptions

    constructor(redis_options?: IRDBOptions, mysql_options?: ISQLOptions) {

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

        this._redis = redis.createClient({
            host: this._redisOptions.host,
            db: this._redisOptions.db,
            port: this._redisOptions.port
        })

        this._mysql = null
    }

    public async initSQL() {
        this._mysql = await mysql.createPool({
            host: this._sqlOptions.host,
            database: this._sqlOptions.db,
            user: this._sqlOptions.user,
            password: this._sqlOptions.pass,
            port: this._sqlOptions.port
        })
    }

    public writeToCache(key: string, value: string, ttl?: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this._redis.set(key, value, (err, reply) => {
                if (err) reject(err)
                if (ttl) {
                    this._redis.expire(key, ttl, (err, treply) => {
                        if (err) reject(err)
                    })
                }
                resolve(reply)
            })
        })
    }

    public getFromCache(key: string): Promise<string|null> {
        return new Promise((resolve, reject) => {
            this._redis.get(key, (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    public delFromCache(key: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this._redis.del(key, (err, reply) => {
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
        
        const hpassword = await argon.hash(password, { type: argon.argon2id, memoryCost: 2 ** 16, hashLength: 50})

        try {
            await this._mysql.execute('INSERT INTO `users` (username, password) VALUES(?, ?)', [username, hpassword])
            return true
        } catch(err) {
            if (err) throw err.code
        }

        return false
    }

    public async verifyUser(username: string, password: string): Promise<boolean> {
        if (!this._mysql) throw new Error("MYSQL ERROR: not initialized")

        try {
            const [row] = await this._mysql.execute<IUser[]>('SELECT * FROM `users` WHERE `username` = ?', [username])
            
            if (row.length === 0) throw new Error("User not found")
            const phash = row[0].password

            try {
                const hverify = await argon.verify(phash, password)
                return hverify
            } catch(err) {
                if (err) throw {err: err, code: "ARGON_FAIL"}
            }

        } catch(err) {
            if (err.code) throw err.code
        }

        return false
    }
}

export default DB