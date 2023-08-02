import { Chat } from 'telegraf/types';

import { CHANNEL_ID } from '../config/dotenv.js';
import { IBotContext, SessionData } from '../context/context.interface.js';
import { errorHandler } from '../errors/error.js';

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
  } catch (error) {
    errorHandler(error);
  }
}
