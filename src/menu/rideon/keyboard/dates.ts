import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

import { weekdays } from '../../../common/weekdays.js';
import { millisecondsInDay } from '../../../common/constants.js';

// количество кнопок с днями старта
export const daysQuantity = 12;

export const getKeyboardDates = (): Markup.Markup<InlineKeyboardMarkup> => {
  const date = [];
  const days = createDatesArray();

  for (let i = 0; i < daysQuantity; i = i + 2) {
    date.push([
      Markup.button.callback(days[i], `dateStart_${days[i]}`),
      Markup.button.callback(days[i + 1], `dateStart_${days[i + 1]}`),
    ]);
  }
  return Markup.inlineKeyboard(date);
};

// формирования массива строк с днями недели и соответствующей датой
export const createDatesArray = (): string[] => {
  const dayArr: string[] = [];

  for (let i = 0; i < daysQuantity; i++) {
    const currentDay: Date = new Date(Date.now() + millisecondsInDay * i);
    const dayNumber: number = currentDay.getDay();

    dayArr.push(`${weekdays.get(dayNumber)}, ${currentDay.toLocaleDateString('ru-RU')}`);
  }

  return dayArr;
};
