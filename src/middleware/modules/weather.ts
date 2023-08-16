import { Types } from 'mongoose';
import { IBotContext } from '../../interface/context.interface.js';
import { getWeather } from '../../weather/weather-get.js';
import { sendMessageWeather } from '../../telegram/message/weather.js';
import { Post } from '../../model/Post.js';

export const createMessageWeather = async (
  ctx: IBotContext,
  date: string,
  locationWeather: string,
  groupId: number,
  messageIdGroup: number,
  _id: Types.ObjectId,
  next: () => void
) => {
  const dateClear = date.slice(-10);
  const { formWeatherStr, weatherCurrent } = await getWeather(dateClear, locationWeather);

  // добавление сообщения о погоде в дискуссию о заезде
  const messageIdWeather = await sendMessageWeather(
    ctx,
    groupId,
    messageIdGroup,
    formWeatherStr
  );

  // выход, если не получен id сообщения о погоде в дискуссионной группе
  if (!messageIdWeather) {
    return next();
  }

  //добавление данных о погоде в БД
  await Post.findOneAndUpdate(
    { _id },
    {
      $set: {
        messageIdWeather,
        tempDay: weatherCurrent ? weatherCurrent.tempDay : '',
        humidity: weatherCurrent ? weatherCurrent.humidity : '',
        descriptionWeather: weatherCurrent ? weatherCurrent.desc : '',
      },
    }
  );
};
