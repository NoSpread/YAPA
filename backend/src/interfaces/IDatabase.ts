import { RowDataPacket } from 'mysql2/promise'

interface IDBUser extends RowDataPacket {
    id: number,
    username: string,
    password: string
}

interface IDBKey extends RowDataPacket {
    id: number,
    username: string,
    key: string
}

interface ILogin {
    id: number,
    username: string,
    api: string
}

interface IKey {
    user: string,
    db: string
}

export {IDBUser, IDBKey, ILogin, IKey}