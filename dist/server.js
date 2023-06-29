"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const user_1 = __importDefault(require("./routes/user"));
const router = (0, express_1.default)();
//mongodb connecting
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    console.log('database connected');
    StartServer();
})
    .catch(error => {
    console.log(error);
    console.log('error connecting database');
});
//Only start the server if database is connected!
const StartServer = () => {
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.get('/test', (req, res) => {
        res.status(200).json({ messate: 'ok' });
    });
    //routes
    router.use('/identify', user_1.default);
    //error handling
    router.use((req, res, next) => {
        const error = new Error('not fount');
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        console.log(`server is runing on port ${config_1.config.server.port}`);
    });
};
