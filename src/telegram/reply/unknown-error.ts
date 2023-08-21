import { IBotContext } from '../../interface/context.interface.js';

export const sendUnknownError = async (ctx: IBotContext): Promise<void> => {
  await ctx.reply('Неизвестная ошибка! Обратитесь к владельцу бота.');
};
