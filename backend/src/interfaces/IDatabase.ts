import {
    RowDataPacket
} from 'mysql2/promise'

interface IDBUser extends RowDataPacket {
    id: number,
    username: string,
    password: string,
    key: any
}

interface IUserinformation extends RowDataPacket {
    id: number,
    fullname: string | null,
    stocks: string | null,
    movement_type: string | null,
    workplaceCity: string | null,
    workplaceCode: string | null,
    workplaceStreet: string | null,
    jokequality: string | null,
    voice: string | null,
    residenceCity: string | null,
    residenceCode: string | null,
    residenceStreet: string | null,
    workstart: string | null
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

export {
    IDBUser,
    IDBKey,
    ILogin,
    IKey,
    IUserinformation
}