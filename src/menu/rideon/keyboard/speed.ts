import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

import { speedSummary } from '../../../common/constants.js';

// формирования массива строк с величинами средних скоростей для заезда
export const getKeyboardSpeeds = (): Markup.Markup<InlineKeyboardMarkup> => {
  const buttons = speedSummary.map((speed) =>
    Markup.button.callback(speed, `speedStart_${speed}`)
  );

  const chunkSize = 4;
  const keyboard = [];

  for (let i = 0; i < buttons.length; i += chunkSize) {
    keyboard.push(buttons.slice(i, i + chunkSize));
  }

  return Markup.inlineKeyboard(keyboard);
};
