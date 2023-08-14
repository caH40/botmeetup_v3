import { IBotContext } from '../interface/context.interface.js';

export const sendPosted = async (ctx: IBotContext, channelName: string): Promise<void> => {
  await ctx.reply(
    `Ваше объявление о заезде опубликовано на канале https://t.me/${channelName}`
  );
};
