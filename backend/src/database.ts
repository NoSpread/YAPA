import redis, { RedisClient } from 'redis'
import mysql, { Pool } from 'mysql2/promise'
import { IRDBOptions, ISQLOptions } from './interfaces/IDBOptions'

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
                db: "DB0",
                port: 6379,
                pass: "",
            }
        }

        if (mysql_options) {
            this._sqlOptions = mysql_options
        } else {
            this._sqlOptions = {
                host: "localhost",
                db: "YAPA",
                user: "root",
                pass: "",
                port: 3306
            }
        }

        this._redis = redis.createClient({
            host: this._redisOptions.host,
            db: this._redisOptions.db,
            password: this._redisOptions.pass,
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

    public writeToCache(key: string, value: string, ttl?: number) {
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

    public getFromCache(key: string) {
        return new Promise((resolve, reject) => {
            this._redis.get(key, (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    public delFromCache(key: string) {
        return new Promise((resolve, reject) => {
            this._redis.del(key, (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }

    public getKeysFromCache(pattern: string) {
        return new Promise((resolve, reject) => {
            this._redis.keys(pattern, (err, reply) => {
                if (err) reject(err)
                resolve(reply)
            })
        })
    }
}

export default DB