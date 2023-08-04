import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';
import { getKeyboardTimes } from '../../keyboard/time.js';
import { errorHandler } from '../../../../errors/error.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionTime = (bot: Telegraf<IBotContext>): void => {
  bot.action(
    'meetTime',
    async (ctx) =>
      await ctx
        .editMessageText('Дата запланированного заезда', { ...getKeyboardTimes() })
        .catch((error) => errorHandler(error))
  );
};
