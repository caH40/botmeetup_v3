import mongoose from 'mongoose';

import { MONGODB } from '../config/dotenv.js';
import { errorHandler } from '../errors/error.js';

export const initMongodb = (): void => {
  mongoose.set('strictQuery', true); //в базе будут только данные которые есть в схеме
  mongoose
    .connect(MONGODB)
    .then(() => {
      console.log('MongoDb connected...'); // eslint-disable-line
    })
    .catch((error) => {
      errorHandler(error);
    });
};
