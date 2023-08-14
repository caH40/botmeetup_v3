import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дистанция" в главном меню
export const getActionPublication = (bot: Telegraf<IBotContext>): void => {
  bot.action('publication', async (ctx) => console.log('publication'));
};
