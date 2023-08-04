import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';
import { errorHandler } from '../../../../errors/error.js';
import { getKeyboardDistances } from '../../keyboard/distances.js';

// обработка нажатия кнопки "Дистанция" в главном меню
export const getActionDistance = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetDistance', async (ctx) => {
    await ctx
      .editMessageText('Дистанция заезда', { ...getKeyboardDistances() })
      .catch((error) => errorHandler(error));
  });
};
