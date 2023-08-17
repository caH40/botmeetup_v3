import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Выбрать объявление" в меню "Использовать ранее созданное объявление"
export const getActionPatternDel = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetPatternDel', async (ctx) => console.log('meetPatternDel'));
};
