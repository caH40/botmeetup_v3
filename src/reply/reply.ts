import { IBotContext } from '../context/context.interface.js';

export const sendReply = async (
  ctx: IBotContext,
  message: string,
  needHtmlTag?: boolean
): Promise<void> => {
  await ctx.reply(message, { parse_mode: needHtmlTag ? 'HTML' : undefined });
};
