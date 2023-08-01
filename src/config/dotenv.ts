import dotenv from 'dotenv';

const { error, parsed } = dotenv.config();

if (error) {
  throw new Error('Не найден файл .env');
}

if (!parsed) {
  throw new Error('Пустой файл .env');
}

export const { BOT_TOKEN, MONGODB, OWNER_CHANNEL_ID, CHANNEL_ID, DISCUSSION_GROUP_ID } = parsed;
