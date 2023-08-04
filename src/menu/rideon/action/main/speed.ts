import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';
import { errorHandler } from '../../../../errors/error.js';
import { getKeyboardSpeeds } from '../../keyboard/speed.js';

// обработка нажатия кнопки "Дистанция" в главном меню
export const getActionSpeed = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetSpeed', async (ctx) => {
    await ctx
      .editMessageText('Средняя скорость заезда, км/ч', { ...getKeyboardSpeeds() })
      .catch((error) => errorHandler(error));
  });
};
