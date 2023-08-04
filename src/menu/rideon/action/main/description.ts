import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionDescription = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetDescription', async (ctx) => console.log('meetDescription'));
};
