import { Message } from 'telegraf/types';

import { IBotContext } from '../interface/context.interface.js';

export const sendReply = async (
  ctx: IBotContext,
  message: string,
  needHtmlTag?: boolean
): Promise<Message.TextMessage> => {
  const response = await ctx.reply(message, { parse_mode: needHtmlTag ? 'HTML' : undefined });

  return response;
};
