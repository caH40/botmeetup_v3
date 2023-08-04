import { IBotContext } from '../interface/context.interface.js';

export const sendRestart = async (ctx: IBotContext): Promise<void> => {
  await ctx.reply('Сессия устарела, запустите команду /rideon');
};
