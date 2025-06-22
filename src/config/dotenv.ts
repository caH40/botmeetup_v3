import dotenv from 'dotenv';

const { error, parsed } = dotenv.config();

if (error) {
  throw new Error('Не найден файл .env');
}

if (!parsed) {
  throw new Error('Пустой файл .env');
}

// ID используются как тип number
export const CHANNEL_ID = +parsed.CHANNEL_ID;
export const GROUP_ID = +parsed.GROUP_ID;
export const OWNER_CHANNEL_ID = +parsed.OWNER_CHANNEL_ID;
export const NODE_ENV: string | undefined = parsed?.NODE_ENV;
export const API_KEY_WEATHER: string = parsed.API_OPENWEATHERMAP_KEY;

export const SERVER_PORT = process.env.SERVER_PORT;
if (!SERVER_PORT) {
  throw new Error('SERVER_PORT не задан в .env');
}
export const REST_BASE_URL = process.env.REST_BASE_URL;
if (!REST_BASE_URL) {
  throw new Error('REST_START_URL не задан в .env');
}

export const serverData = {
  SERVER_PORT,
  REST_BASE_URL,
};

export const { BOT_TOKEN, MONGODB } = parsed;
