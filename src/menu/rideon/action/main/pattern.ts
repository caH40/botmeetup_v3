import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

import { handlerPattern } from '../../handler-actions/pattern.js';

// обработка нажатия кнопки "Использовать ранее созданное объявление" в главном меню
export const getActionPattern = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetPattern', async (ctx) => await handlerPattern(ctx));
};
