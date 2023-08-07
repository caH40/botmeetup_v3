import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionLocation = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetLocation', async (ctx) => await ctx.scene.enter('location'));
};
