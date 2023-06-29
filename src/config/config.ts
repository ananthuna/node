import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || 'ananthu4uuu';  
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || 'iBOJnAZ0nKlddsaa';   
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.4hx6re0.mongodb.net/`

const SERVER_PORT: Number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}