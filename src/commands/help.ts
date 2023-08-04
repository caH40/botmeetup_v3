import { Telegraf } from 'telegraf';

import { IBotContext } from '../interface/context.interface.js';
import { sendReply } from '../reply/reply.js';
import { commandsMessage } from '../common/command.js';

export const commandHelp = (bot: Telegraf<IBotContext>): void => {
  bot.command('help', async (ctx: IBotContext) => await sendReply(ctx, commandsMessage));
};
