import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import {getConfigHelper} from "./core/config/helper";
import {getConfig} from "./_config";
import {connectToRabbitMQ} from "./core/messaging/connect";
import {httpErrorHandler} from "./core/errors/httpErrorHandler";
import {connectToDB} from "./core/database/connect";

/**
 * COMPOSITION ROOT
 * ========================
 */
export const getApp = async () => {

    // load environment and config
    dotenv.config({ path: ".env" })
    const config = getConfigHelper(getConfig(process.env))

    // connect to message broker
    let { channel, connection } = await connectToRabbitMQ({ config })

    // connect to mysql database
    const dbConn = await connectToDB({ config })

    // bootstrap express application
    const app = express()
    app.set('port', config('port'))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('dev'))

    app.use(httpErrorHandler)
    app.use((err, _, __, ___) => console.error('unhandled error: ', err))

    return app
}
