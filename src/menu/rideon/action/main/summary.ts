import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionSummary = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetSummary', async (ctx) => console.log('meetSummary'));
};
