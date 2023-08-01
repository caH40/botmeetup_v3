import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface.js';

export const commandRideOn = (bot: Telegraf<IBotContext>): void => {
  bot.command('rideon', (ctx: IBotContext) => ctx.reply('get rideon'));
};
