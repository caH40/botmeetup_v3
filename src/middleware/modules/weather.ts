import { Types } from 'mongoose';
import { IBotContext } from '../../interface/context.interface.js';
import { getWeather } from '../../weather/weather-get.js';
import { sendMessageWeather } from '../../telegram/message/weather.js';
import { Post } from '../../model/Post.js';
import { formWeather } from '../../modules/forms/weather.js';

type Params = {
  ctx: IBotContext;
  groupId: number;
  messageIdGroup: number;
  weatherLocationName: string;
  postId: Types.ObjectId;
  next: () => void;
};

export const createMessageWeather = async ({
  ctx,
  groupId,
  messageIdGroup,
  postId,
  weatherLocationName,
  next,
}: Params) => {
  const weatherCurrent = await getWeather(postId);

  // Если не найдена погода для поста, то выход из текущего middleware.
  if (!weatherCurrent) {
    return next();
  }

  // Формирование строки для сообщения в телеге.
  const formWeatherStr = formWeather(weatherCurrent, weatherLocationName);

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
    { _id: postId },
    {
      $set: {
        messageIdWeather,
        tempDay: weatherCurrent ? weatherCurrent.temp : '',
        humidity: weatherCurrent ? weatherCurrent.humidity : '',
        descriptionWeather: weatherCurrent ? weatherCurrent.weather.description : '',
      },
    }
  );
};
