import { Types } from 'mongoose';

import { IBotContext } from '../../interface/context.interface.js';
import { sendPoll } from '../../telegram/poll.js';
import { Poll } from '../../model/Poll.js';

export const createMessagePoll = async (
  ctx: IBotContext,
  groupId: number,
  messageIdGroup: number,
  _id: Types.ObjectId,
  next: () => void
) => {
  // отправляем голосования в группу дискуссий
  const poll = await sendPoll(ctx, groupId, messageIdGroup);
  // выход, если не получены данные сообщения с голосованием
  if (!poll) {
    return next();
  }
  // создание документа Poll в БД
  await Poll.create({ postId: _id, poll });
};
