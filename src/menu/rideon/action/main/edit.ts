import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дистанция" в главном меню
export const getActionEdit = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetEdit_back', async (ctx) => console.log('meetEdit_back'));
};
