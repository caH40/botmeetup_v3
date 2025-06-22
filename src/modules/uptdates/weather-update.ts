import { Post } from '../../model/Post.js';
import { getWeather } from '../../weather/weather-get.js';
import { errorHandler } from '../../errors/error.js';
import { IPost } from '../../interface/model/post.interface.js';
import { isNotActualDate } from '../../utils/actual.js';
import { IMixContext } from '../../interface/context.interface.js';

import { updateMessageWeather } from '../../telegram/message-weather.js';
import { updateWeatherDB } from '../../database/weather-in-post.js';
import { formWeather } from '../forms/weather.js';
import { Types } from 'mongoose';

type PostFromDB = IPost & { _id: Types.ObjectId };

// обновление погоды в дискуссионных группах, соответствующих актуальным объявлениям о велозаездах
export async function weatherUpdate(ctx: IMixContext) {
  try {
    const postsDB = await Post.find().lean<PostFromDB[]>();

    for (const post of postsDB) {
      const date = post.date.slice(-10);
      const time = post.time;

      // если заезд не актуален (уже стартовал), то переход к следующему объявлению о заезде
      const isNotActual = isNotActualDate(date, time);
      if (isNotActual) {
        continue;
      }

      const weatherCurrent = await getWeather(post._id);

      if (!weatherCurrent) {
        return;
      }

      // Формирование строки для сообщения в телеге.
      const formWeatherStr = formWeather(weatherCurrent, post.weatherLocation.name);

      //если нет данных в БД, то выход
      if (!formWeatherStr) {
        return console.log('В БД нет данных о погоде'); // eslint-disable-line
      }
      // обновление данных в БД в Post
      await updateWeatherDB(post._id, weatherCurrent);

      //обновление сообщения в дискуссионной группе к объявлению о велозаезде
      await updateMessageWeather(ctx, post.messageIdWeather, formWeatherStr);
    }
  } catch (error) {
    errorHandler(error);
  }
}
