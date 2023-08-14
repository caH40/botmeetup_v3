import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionPicture = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetPicture', async (ctx) => await ctx.scene.enter('picture'));
};
