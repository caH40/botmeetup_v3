import express, { Express } from 'express';
import cors from 'cors';

import { SERVER_PORT } from '../config/dotenv.js';
import { getWeatherGeo } from './controllers.js';

const serverApp: Express = express();
const port = SERVER_PORT;

serverApp.use(cors());
serverApp.use(express.json());

serverApp.post('/:entity', getWeatherGeo);

export { serverApp, port };
