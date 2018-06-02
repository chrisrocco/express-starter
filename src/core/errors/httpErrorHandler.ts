import {HTTPError} from "./HTTPError";

export const httpErrorHandler = (err, req, res, next) => {
    if(err instanceof HTTPError) {
        res.status(err.statusCode).json({
            msg: err.message,
            trace: err.stack
        })
    } else {
        res.status(500).json({
            msg: err.message,
            trace: err.stack
        })
    }

    // pass down pipeline for connection cleanup, logging, etc.
    next(err)
}