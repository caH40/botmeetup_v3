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
export const API_KEY_WEATHER: string = parsed.API_KEY_WEATHER;

export const { BOT_TOKEN, MONGODB } = parsed;
