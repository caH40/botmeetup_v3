import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';

import { regular } from '../../../../common/constants.js';
import { handlerPatternDelOne } from '../../handler-actions/handler.pattern-del-one.js';

// обработка нажатия кнопки "Удаление объявления" в меню "Использовать ранее созданное объявление"
export const getActionPatternDelOne = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.postIdDelOne, async (ctx) => await handlerPatternDelOne(ctx));
};
