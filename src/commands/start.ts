import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface.js';

export const commandStart = (bot: Telegraf<IBotContext>): void => {
  bot.command('go', (ctx: IBotContext) => ctx.reply('get started'));
};
