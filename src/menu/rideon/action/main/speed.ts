import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionSpeed = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetSpeed', async (ctx) => console.log('meetSpeed')); //eslint-disable-line
};
