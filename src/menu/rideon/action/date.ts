import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionDate = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetDate', () => undefined);
};
