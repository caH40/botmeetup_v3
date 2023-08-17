import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';

import { regular } from '../../../../common/constants.js';
import { handlerPatternGetOne } from '../../handler-actions/handler.pattern-get-one.js';

// обработка нажатия кнопки "Выбрать объявление" в меню "Использовать ранее созданное объявление"
export const getActionPatternGetOne = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.postIdGetOne, async (ctx) => await handlerPatternGetOne(ctx));
};
