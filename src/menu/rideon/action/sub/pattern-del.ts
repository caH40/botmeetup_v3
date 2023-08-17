import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';
import { handlerPatternDel } from '../../handler-actions/pattern-del.js';

// обработка нажатия кнопки "Удалить объявление" в меню "Использовать ранее созданное объявление"
export const getActionPatternDel = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetPatternDel', async (ctx) => await handlerPatternDel(ctx));
};
