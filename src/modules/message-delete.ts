import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';

//
// сохранение id сообщений для последующего удаления
//
export const saveMessageIdForDel = (ctx: IBotContext, messageId: number): void => {
  if (!ctx.session.messageDel) {
    ctx.session.messageDel = [];
  }
  // сохранение id сообщений для последующего удаления
  ctx.session.messageDel.push(messageId);
};

//
// удаление старых сообщений, id которых сохранены в сессии
//
export const deleteMyMessage = async (ctx: IBotContext): Promise<void> => {
  if (ctx.session.messageDel?.length) {
    const messagesForDel = ctx.session.messageDel;
    for (const messageId of messagesForDel) {
      await ctx.deleteMessage(messageId).catch((error) => errorHandler(error));
    }
    ctx.session.messageDel = [];
  }
};
