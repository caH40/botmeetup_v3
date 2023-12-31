import { NODE_ENV } from '../config/dotenv.js';
import { logError } from '../logger/logger.js';
import { ignoreError } from './ignore.js';
import { parseError } from './parse.js';

export const errorHandler = (error: unknown): void => {
  try {
    // выход, если ошибка из списка игнорируемых
    if (ignoreError(error)) {
      return;
    }
    // если разработка, то выводить ошибку в консоль
    if (NODE_ENV === 'development') console.log(error); // eslint-disable-line

    const errorParsed = parseError(error);

    // логирование ошибки
    logError(errorParsed);
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
};
