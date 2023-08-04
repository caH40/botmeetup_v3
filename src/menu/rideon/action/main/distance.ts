import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionDistance = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetDistance', async (ctx) => console.log('meetDistance')); //eslint-disable-line
};
