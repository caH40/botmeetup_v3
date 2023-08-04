import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionTime = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetTime', async (ctx) => console.log('meetTime'));
};
