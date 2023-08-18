import { Telegraf } from 'telegraf';

import { handlerCommandEdit } from '../handlers/commands/edit.js';

import { IBotContext } from '../interface/context.interface.js';

export const commandEdit = (bot: Telegraf<IBotContext>): void => {
  bot.command('edit', async (ctx: IBotContext) => await handlerCommandEdit(ctx));
};
