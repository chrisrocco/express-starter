import {getApp} from "./app"
import {RabbitMQConnectionError} from "./core/messaging/errors/RabbitMQConnectionError";

let retries = 25

// delay is in seconds
const retry = (delay = 5) => {
    if(retries === 0)
        return console.error("Maximum retry count exceeded. Stopping.")
    console.log(`Retrying in ${delay} seconds..`)
    setTimeout(() => startServer(), delay*1000)
    --retries
}

export const startServer = async () => {
    try {
        let app = await getApp()
        app.listen( app.get('port'), _ => console.log('App running on port ' + app.get('port')))
    } catch (e) {
        if( e instanceof RabbitMQConnectionError) {
            console.error("Could not connect to RabbitMQ", e)
            return retry()
        }
        console.error(e)
        throw new Error("Failed to start server. Unknown reason")
    }
}

startServer()
