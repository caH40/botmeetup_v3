import { Chat } from 'telegraf/types';

import { CHANNEL_ID } from '../config/dotenv.js';
import { IBotContext } from '../interface/context.interface.js';
import { errorHandler } from '../errors/error.js';
import { SessionData } from '../interface/session.interface.js';

// проверка состоит ли пользователь бота в соответствующем канале объявлений,
// если нет то бот недоступен

export async function initSession(ctx: IBotContext) {
  try {
    const { title, linked_chat_id } = (await ctx.telegram.getChat(
      CHANNEL_ID
    )) as Chat.ChannelGetChat;

    // обнуление сессии
    ctx.session = <SessionData>{};

    ctx.session.channelId = CHANNEL_ID;
    ctx.session.channelName = title;
    ctx.session.linkedChatId = linked_chat_id;
    ctx.session.messageDel = [];

    if (ctx.message) {
      const userName = ctx.message.from.username;
      const userId = ctx.message.from.id;

      ctx.session.leader = `@${userName}`;
      ctx.session.userId = userId;
    }

    if (ctx.callbackQuery) {
      const userName = ctx.callbackQuery.from.username;
      const userId = ctx.callbackQuery.from.id;

      ctx.session.leader = `@${userName}`;
      ctx.session.userId = userId;
    }
  } catch (error) {
    errorHandler(error);
  }
}
