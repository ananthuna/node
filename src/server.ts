import express, { Request, Response, NextFunction, Application } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import userRouter from './routes/user'

const router: Application = express();


//mongodb connecting
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('database connected');
        StartServer()
    })
    .catch(error => {
        console.log(error);

        console.log('error connecting database');
    })

//Only start the server if database is connected!
const StartServer = () => {

    router.use(express.urlencoded({ extended: true }))
    router.use(express.json())


    //routes
    router.use('/identify', userRouter)


    //error handling
    router.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error('not fount')
        return res.status(404).json({ message: error.message })
    })

    http.createServer(router).listen(config.server.port, () => {
        console.log(`server is runing on port ${config.server.port}`);
    })
}