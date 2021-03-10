import mysql, {RowDataPacket} from 'mysql2/promise'

interface IDBUser extends RowDataPacket {
    id: number,
    username: string,
    password: string,
    key: any
}

(async () => {
    const pool = await mysql.createPool({
        host: "localhost",
        password: "",
        user: "root",
        database: "yapa"
    })

    const [shit] = await pool.execute<IDBUser[]>('SELECT u.`id`, u.`username`, u.`password`, k.`key` FROM `users` AS u LEFT JOIN `keys` AS k ON u.`id` = k.`id` WHERE u.`username` = ?', ["admin"])
    console.log(shit[0])
})()