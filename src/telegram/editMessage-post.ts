import { GROUP_ID } from '../config/dotenv.js';
import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';

export const editPost = async (
  ctx: IBotContext,
  post: number,
  formWeatherStr: string
): Promise<void> => {
  //обновление сообщения в дискуссионной группе к объявлению о велозаезде
  await ctx.telegram
    .editMessageText(
      GROUP_ID,
      post,
      'привет!',
      formWeatherStr + `\nUpdate: ${new Date().toLocaleString()}`,
      {
        parse_mode: 'HTML',
      }
    )
    .catch((error) => errorHandler(error));
};
