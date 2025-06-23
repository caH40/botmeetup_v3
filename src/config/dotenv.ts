import { getEnvVar } from '../utils/dotenv.js';

export const CHANNEL_ID = getEnvVar('CHANNEL_ID', 'number');
export const GROUP_ID = getEnvVar('GROUP_ID', 'number');
export const OWNER_CHANNEL_ID = getEnvVar('OWNER_CHANNEL_ID', 'number');
export const NODE_ENV = getEnvVar('NODE_ENV', 'string');
export const API_KEY_WEATHER = getEnvVar('API_OPENWEATHERMAP_KEY', 'string');
export const SERVER_PORT = getEnvVar('SERVER_PORT', 'string');
export const BOT_TOKEN = getEnvVar('BOT_TOKEN', 'string');
export const MONGODB = getEnvVar('MONGODB', 'string');
export const YANDEXMAP_FRONT_BASE_URL = getEnvVar('YANDEXMAP_FRONT_BASE_URL', 'string');
