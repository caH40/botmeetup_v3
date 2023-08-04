import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

import { distanceSummary } from '../../../common/constants.js';

// количество столбцов в меню
const columns = 4;

// формирования массива строк с величинами дистанций для заезда
export const getKeyboardDistances = (): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboard = [];
  for (let i = 0; i < distanceSummary.length; i = i + columns) {
    keyboard.push([
      Markup.button.callback(distanceSummary[i], `distanceStart_${distanceSummary[i]}`),
      Markup.button.callback(distanceSummary[i + 1], `distanceStart_${distanceSummary[i + 1]}`),
      Markup.button.callback(distanceSummary[i + 2], `distanceStart_${distanceSummary[i + 2]}`),
      Markup.button.callback(distanceSummary[i + 3], `distanceStart_${distanceSummary[i + 3]}`),
    ]);
  }
  return Markup.inlineKeyboard(keyboard);
};
