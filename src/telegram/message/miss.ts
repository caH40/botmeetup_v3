import { GROUP_ID } from '../../config/dotenv.js';
import { IBotContext } from '../../interface/context.interface.js';

export const missBikeRide = async (
  ctx: IBotContext,
  messageIdGroup: number,
  firstName: string
): Promise<void> => {
  await ctx.telegram.sendMessage(
    GROUP_ID,
    `${firstName}, Вы опоздали с голосованием, заезд уже состоялся!`,
    {
      reply_parameters: {
        message_id: messageIdGroup,
      },
    }
  );
};
