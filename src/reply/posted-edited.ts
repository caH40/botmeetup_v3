import { IBotContext } from '../interface/context.interface.js';

export const sendPostedEdited = async (
  ctx: IBotContext,
  channelName: string
): Promise<void> => {
  await ctx.reply(
    `Ваше объявление о заезде было изменено, объявление на канале https://t.me/${channelName}`
  );
};
