import { Message } from 'telegraf/types';

import { IBotContext } from '../interface/context.interface.js';
import { Post } from '../model/Post.js';
import { createMessageWeather } from './modules/weather.js';
import { createMessagePoll } from './modules/poll.js';

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

  // обрабатываются только сообщения от telegram, то есть когда telegram создает
  // дискуссию к посту в канале объявлений о велозаездах

  const groupId = ctx.message.chat.id;
  const messageId = (ctx.message as Message.CommonMessage).forward_from_message_id;
  const messageIdGroup = ctx.message.message_id;

  const postDB = await Post.findOneAndUpdate({ messageId }, { $set: { messageIdGroup } });
  // выход, если Объявление о велозаезде не найдено в БД
  if (!postDB) {
    return next();
  }
  const { _id, date, locationWeather } = postDB;

  // обработчик сообщения о голосовании для дискуссионной группы
  await createMessagePoll(ctx, groupId, messageIdGroup, _id, next);

  // обработчик сообщения о погоде для дискуссионной группы
  await createMessageWeather(ctx, date, locationWeather, groupId, messageIdGroup, _id, next);
};
