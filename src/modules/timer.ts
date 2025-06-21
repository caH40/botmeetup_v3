import { IMixContext } from '../interface/context.interface.js';
import { weatherUpdate } from './uptdates/weather-update.js';
import { updatePosts } from './uptdates/post.js';
import { errorHandler } from '../errors/error.js';
import { getWeatherForActualPosts } from '../weather/weather-for-posts.js';
import { millisecondsInHour, millisecondsInMinute } from '../common/constants.js';

export function timers(bot: IMixContext) {
  try {
    setInterval(async () => {
      // получение погода из API для актуальных объявлений о велозаездах
      // сохранение данных в БД
      await getWeatherForActualPosts();

      // обновление погоды в дискуссионных группах, соответствующих актуальным объявлениям о велозаездах
      await weatherUpdate(bot);
    }, millisecondsInHour);

    // Обновление всех актуальных объявлений в канале.
    setInterval(async () => {
      await updatePosts(bot);
    }, millisecondsInMinute);
  } catch (error) {
    errorHandler(error);
  }
}
