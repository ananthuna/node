"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'ananthu4uuu';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'iBOJnAZ0nKlddsaa';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.4hx6re0.mongodb.net/`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
