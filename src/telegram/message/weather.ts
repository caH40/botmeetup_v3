import { errorHandler } from '../../errors/error.js';
import { IBotContext } from '../../interface/context.interface.js';

export const sendMessageWeather = async (
  ctx: IBotContext,
  groupId: number,
  messageIdGroup: number,
  formWeatherStr?: string
) => {
  const optionalOptions = {
    is_anonymous: false,
    correct_option_id: 0,
    reply_to_message_id: messageIdGroup,
  };

  // добавление голосования кто участвует в заезде в дискуссию о заезде

  const response = await ctx.telegram
    .sendMessage(groupId, formWeatherStr ?? 'нет данных', optionalOptions)
    .catch((error) => errorHandler(error));

  const messageId = response ? response.message_id : undefined;

  return messageId;
};
