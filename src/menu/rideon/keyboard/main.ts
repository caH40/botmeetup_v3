import { InlineKeyboardMarkup } from 'telegraf/types';
import { serverData } from '../../../config/dotenv.js';

export const keyboardMain = (): InlineKeyboardMarkup => ({
  inline_keyboard: [
    [
      { text: 'Дата заезда', callback_data: 'meetDate' },
      { text: 'Время старта', callback_data: 'meetTime' },
    ],
    [
      {
        text: 'Место старта',
        web_app: {
          url: serverData.REST_BASE_URL + 'start',
        },
      },
      {
        text: 'Погода',
        web_app: {
          url: serverData.REST_BASE_URL + 'weather',
        },
      },
    ],
    [
      { text: 'Дистанция, км', callback_data: 'meetDistance' },
      { text: 'Средняя скорость', callback_data: 'meetSpeed' },
    ],
    [
      { text: 'Картинка', callback_data: 'meetPicture' },
      { text: 'Описание', callback_data: 'meetDescription' },
    ],
    [{ text: 'Использовать ранее созданное объявление', callback_data: 'meetPattern' }],
    [{ text: 'Сводные данные по заезду', callback_data: 'meetSummary' }],
  ],
});
