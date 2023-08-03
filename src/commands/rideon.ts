import { Telegraf } from 'telegraf';

import { IBotContext } from '../interface/context.interface.js';
import { rideonMainMenu } from '../menu/rideon/main.js';
import { initSession } from '../modules/session.js';

// обработка команды /rideon
export const commandRideOn = (bot: Telegraf<IBotContext>): void => {
  bot.command('rideon', async (ctx: IBotContext) => {
    await initSession(ctx);
    await rideonMainMenu(ctx);
  });
};
