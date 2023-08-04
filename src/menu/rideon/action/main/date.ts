import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';
import { getKeyboardDates } from '../../keyboard/dates.js';
import { errorHandler } from '../../../../errors/error.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionDate = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetDate', async (ctx) => {
    await ctx
      .editMessageText('Дата запланированного заезда', { ...getKeyboardDates() })
      .catch((error) => errorHandler(error));
  });
};
