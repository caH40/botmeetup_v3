import { GROUP_ID } from '../config/dotenv.js';
import { errorHandler } from '../errors/error.js';
import { IMixContext } from '../interface/context.interface.js';

export const updateMessageWeather = async (
  ctx: IMixContext,
  post: number,
  formWeatherStr: string
): Promise<void> => {
  //обновление сообщения в дискуссионной группе к объявлению о велозаезде
  await ctx.telegram
    .editMessageText(
      GROUP_ID,
      post,
      'привет!',
      formWeatherStr + `\nUpdate: ${new Date().toLocaleString('ru-RU')}`,
      {
        parse_mode: 'HTML',
      }
    )
    .catch((error) => errorHandler(error));
};
