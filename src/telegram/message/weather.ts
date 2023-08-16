import { errorHandler } from '../../errors/error.js';
import { IBotContext } from '../../interface/context.interface.js';

export const sendMessageWeather = async (
  ctx: IBotContext,
  groupId: number,
  messageIdGroup: number,
  formWeatherStr?: string
) => {
  const message = formWeatherStr ?? 'нет данных';

  // добавление голосования кто участвует в заезде в дискуссию о заезде

  const response = await ctx.telegram
    .sendMessage(groupId, message, {
      reply_to_message_id: messageIdGroup,
      parse_mode: 'HTML',
    })
    .catch((error) => errorHandler(error));

  const messageId = response ? response.message_id : undefined;

  return messageId;
};
