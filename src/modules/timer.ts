import { IMixContext } from '../interface/context.interface.js';
import { weatherUpdate } from './uptdates/weather-update.js';
import { updatePosts } from './uptdates/post.js';
import { errorHandler } from '../errors/error.js';
import { getWeatherForActualPosts } from '../weather/weather-for-posts.js';

export function timers(bot: IMixContext) {
  try {
    const millisecondsInHour = 3600000;
    const millisecondsInMinute = 60000;

    setInterval(async () => {
      // получение погода из API для актуальных объявлений о велозаездах
      // сохранение данных в БД
      await getWeatherForActualPosts();

      // обновление погоды в дискуссионных группах, соответствующих актуальным объявлениям о велозаездах
      await weatherUpdate(bot);
    }, millisecondsInHour);
    setInterval(async () => {
      //обновление всех актуальных объявлений в канале
      await updatePosts(bot);
    }, millisecondsInMinute);
  } catch (error) {
    errorHandler(error);
  }
}
