import { Chat } from 'telegraf/types';

import { CHANNEL_ID } from '../config/dotenv.js';
import { IBotContext } from '../context/context.interface.js';
import { inviteJoinToChannel } from '../reply/invite-join-channel.js';
import { sendUnknownError } from '../reply/unknown-error.js';

// проверка состоит ли пользователь бота в соответствующем канале объявлений,
// если нет то бот недоступен

export async function checkMember(ctx: IBotContext, next: () => void) {
  try {
    // id самого телеграмма
    const telegramId = 777000;
    // юзер id в телеграмм автора сообщения
    const userId = ctx.message?.from.id ?? telegramId;

    // если не получен id пользователя то выход из middleware
    if (userId === telegramId) {
      await sendUnknownError(ctx);
      return;
    }
    // получение статуса пользователя в соответствующем канале
    const { status } = await ctx.telegram.getChatMember(CHANNEL_ID, userId);

    if (['member', 'administrator', 'creator'].includes(status)) {
      return next();
    } else {
      const { title, invite_link } = (await ctx.telegram.getChat(
        CHANNEL_ID
      )) as Chat.ChannelGetChat;

      // ответ пользователю
      await inviteJoinToChannel(ctx, title, invite_link);
    }

    return;
  } catch (error) {
    console.log(error);
  }
}