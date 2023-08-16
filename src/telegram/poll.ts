import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';

export const sendPoll = async (ctx: IBotContext, groupId: number, messageIdGroup: number) => {
  const pollAnswers = ['Участвую!', 'Не участвую!', 'Ищу возможность!'];
  const optionalOptions = {
    is_anonymous: false,
    correct_option_id: 0,
    reply_to_message_id: messageIdGroup,
  };

  // добавление голосования кто участвует в заезде в дискуссию о заезде

  const responsePoll = await ctx.telegram
    .sendPoll(groupId, 'Кто участвует в заезде?', pollAnswers, optionalOptions)
    .catch((error) => errorHandler(error));

  return responsePoll?.poll;
};
