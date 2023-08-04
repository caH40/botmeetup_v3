import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

import { speedSummary } from '../../../common/constants.js';

// формирования массива строк с величинами средних скоростей для заезда
export const getKeyboardSpeeds = (): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboard = [
    [
      Markup.button.callback(speedSummary[0], `speedStart_${speedSummary[0]}`),
      Markup.button.callback(speedSummary[1], `speedStart_${speedSummary[1]}`),
      Markup.button.callback(speedSummary[2], `speedStart_${speedSummary[2]}`),
    ],
    [
      Markup.button.callback(speedSummary[3], `speedStart_${speedSummary[3]}`),
      Markup.button.callback(speedSummary[4], `speedStart_${speedSummary[4]}`),
      Markup.button.callback(speedSummary[5], `speedStart_${speedSummary[5]}`),
    ],
  ];
  return Markup.inlineKeyboard(keyboard);
};
