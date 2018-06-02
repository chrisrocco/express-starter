import {createConnection} from "typeorm";
import {ENTITIES} from "./_entities";


export const connectToDB = async ({ config }) => {
    return await createConnection({
        type: "mysql",
        host: config('mysql.host'),
        port: 3306,
        username: config('mysql.user'),
        password: config('mysql.pass'),
        database: config('mysql.database'),
        entities: ENTITIES,
        synchronize: true,
        logging: false
    })
}
