import { Telegraf } from 'telegraf';

import { IBotContext } from '../interface/context.interface.js';
import { sendGreeting } from '../telegram/reply/greeting.js';
import { initSession } from '../modules/session.js';
import { errorHandler } from '../errors/error.js';

export const commandStart = (bot: Telegraf<IBotContext>): void => {
  bot.command('start', async (ctx: IBotContext) => {
    try {
      await initSession(ctx);
      const userName = ctx.message?.from.username;

      await sendGreeting(ctx, userName);
    } catch (error) {
      errorHandler(error);
    }
  });
};
