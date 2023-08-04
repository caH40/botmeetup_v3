import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionCover = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetCover', async (ctx) => console.log('meetCover')); //eslint-disable-line
};
