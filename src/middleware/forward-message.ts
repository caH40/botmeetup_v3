import { Message } from 'telegraf/types';

import { IBotContext } from '../interface/context.interface.js';
import { Post } from '../model/Post.js';
import { createMessageWeather } from './modules/weather.js';
import { createMessagePoll } from './modules/poll.js';

/**
 * Middleware для отслеживания перенаправленного сообщения - это информация о новом Посте Объявления.
 * В объявление добавляется голосование и погода.
 */
export const controlForwardMessage = async (ctx: IBotContext, next: () => void) => {
  // обрабатываются сообщения со свойством message
  if (!ctx.message) {
    return next();
  }
  // id самого телеграмма
  const telegramId = 777000;

  // юзер id в телеграмм автора сообщения
  const userId = ctx.message.from.id;

  // если это не переадресация с id telegram, то выход из middleware
  if (userId !== telegramId) {
    return next();
  }

  // Обрабатываются только сообщения от telegram, то есть когда telegram создает
  // дискуссию к посту в канале объявлений о велозаездах
  const groupId = ctx.message.chat.id;
  // const messageId = (ctx.message as Message.CommonMessage).forward_from_message_id;
  const getForwardedMessageId = (msg: Message.CommonMessage): number | undefined => {
    if (msg.forward_origin) {
      if ('message_id' in msg.forward_origin) {
        return msg.forward_origin.message_id;
      }
    }
    return undefined;
  };

  const messageId = getForwardedMessageId(ctx.message as Message.CommonMessage);

  const messageIdGroup = ctx.message.message_id;

  const postDB = await Post.findOneAndUpdate(
    { messageId },
    { $set: { messageIdGroup } }
  ).lean();

  // выход, если Объявление о велозаезде не найдено в БД
  if (!postDB) {
    return next();
  }

  // обработчик сообщения о голосовании для дискуссионной группы
  await createMessagePoll(ctx, groupId, messageIdGroup, postDB._id, next);

  // обработчик сообщения о погоде для дискуссионной группы
  await createMessageWeather({
    ctx,
    groupId,
    messageIdGroup,
    postId: postDB._id,
    weatherLocationName: postDB.weatherLocation.name,
    next,
  });
};
