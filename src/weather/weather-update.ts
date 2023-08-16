import { Post } from '../model/Post.js';
import { getWeather } from './weather-get.js';
import { errorHandler } from '../errors/error.js';
import { IPost } from '../interface/model/post.interface.js';
import { isNotActualDate } from '../utils/actual.js';
import { IBotContext } from '../interface/context.interface.js';

import { editPost } from '../telegram/editMessage-post.js';
import { updateWeatherInPost } from '../database/update/weather-in-post.js';

// обновление погоды в актуальных Объявлениях в канале телеграмм
export async function weatherUpdate(ctx: IBotContext) {
  try {
    const postsDB: IPost[] = await Post.find();

    for (let i = 0; i < postsDB.length; i++) {
      const location = postsDB[i].locationWeather;
      const date = postsDB[i].date.slice(-10);
      const time = postsDB[i].time;

      // если заезд не актуален (уже стартовал), то переход к следующему объявлению о заезде
      const isNotActual = isNotActualDate(date, time);
      if (isNotActual) {
        continue;
      }

      const { formWeatherStr, weatherCurrent } = await getWeather(date, location);

      //если нет данных в БД, то выход
      if (!formWeatherStr) {
        return console.log('В БД нет данных о погоде'); // eslint-disable-line
      }
      // обновление данных о погоде в посте
      await updateWeatherInPost(postsDB[i]._id, weatherCurrent);

      //обновление сообщения в дискуссионной группе к объявлению о велозаезде
      // await editPost(ctx, postsDB[i].messageIdWeather, formWeatherStr);
    }
  } catch (error) {
    errorHandler(error);
  }
}
