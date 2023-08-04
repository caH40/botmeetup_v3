import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionPattern = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetPattern', async (ctx) => console.log('meetPattern')); //eslint-disable-line
};
