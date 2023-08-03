import { IBotContext } from '../interface/context.interface.js';

export const inviteJoinToChannel = async (
  ctx: IBotContext,
  title: string,
  invite_link?: string
): Promise<void> => {
  await ctx.reply(
    `Для создания объявления о велозаезде необходимо состоять в канале <strong>${title}</strong>!\nПрисоединиться к каналу ${invite_link}`,
    { parse_mode: 'HTML' }
  );
};
