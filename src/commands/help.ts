import { Telegraf } from 'telegraf';

import { IBotContext } from '../context/context.interface.js';
import { sendReply } from '../reply/reply.js';
import { commandsMessage } from '../assets/command.js';

export const commandHelp = (bot: Telegraf<IBotContext>): void => {
  bot.command('help', async (ctx: IBotContext) => await sendReply(ctx, commandsMessage));
};
