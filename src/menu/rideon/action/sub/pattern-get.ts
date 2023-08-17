import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';
import { handlerPatternGet } from '../../handler-actions/pattertn-get.js';

// обработка нажатия кнопки "Выбрать объявление" в меню "Использовать ранее созданное объявление"
export const getActionPatternGet = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetPatternGet', async (ctx) => await handlerPatternGet(ctx));
};
