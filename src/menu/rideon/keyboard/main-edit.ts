import { InlineKeyboardMarkup } from 'telegraf/types';
import { YANDEXMAP_FRONT_BASE_URL } from '../../../config/dotenv.js';

export const keyboardMainForEdit = (): InlineKeyboardMarkup => ({
  inline_keyboard: [
    [
      { text: 'Дата заезда ✔️', callback_data: 'meetDate' },
      { text: 'Время старта ✔️', callback_data: 'meetTime' },
    ],
    [
      {
        text: 'Место старта',
        web_app: {
          url: YANDEXMAP_FRONT_BASE_URL + 'start',
        },
      },
      {
        text: 'Погода',
        web_app: {
          url: YANDEXMAP_FRONT_BASE_URL + 'weather',
        },
      },
    ],
    [
      { text: 'Дистанция, км ✔️', callback_data: 'meetDistance' },
      { text: 'Средняя скорость ✔️', callback_data: 'meetSpeed' },
    ],
    [
      { text: 'Картинка ✔️', callback_data: 'meetPicture' },
      { text: 'Описание ✔️', callback_data: 'meetDescription' },
    ],
    [{ text: 'Сводные данные по заезду', callback_data: 'meetSummaryFromEdit' }],
  ],
});
