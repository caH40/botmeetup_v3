import { Telegraf } from 'telegraf';

import { IBotContext } from '../context/context.interface.js';
import { sendGreeting } from '../reply/greeting.js';
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
