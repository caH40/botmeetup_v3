import { upsertWeatherWeek } from './weatherweek-save.js';
import { errorHandler } from '../errors/error.js';
import { getWeatherFromApi } from '../api/openweather.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';
import { getWeatherLocationCoords } from './weather-coords.js';
import { createCurrentWeatherForDB } from '../utils/weather.js';

/**
 * 1. Получение координат всех мест погоды из актуальных Объявлений.
 * 2. Запрос погода для полученных координат из API погоды.
 * 3. Обновление данных погоды для всех актуальных объявлений.
 */
export async function getWeatherForActualPosts(): Promise<void> {
  try {
    // получение городов из актуальных постов (заезды еще не состоялись) для мониторинга погоды
    const weatherLocationCoords = await getWeatherLocationCoords();

    // если нет городов для мониторинга погоды, то выход из функции
    if (!weatherLocationCoords.length) {
      return;
    }

    //массив для сохранения в БД
    const weathersForDB: IWeatherWeek[] = [];

    // запрос погоды для актуальных объявлений о велозаездах
    for (const item of weatherLocationCoords) {
      const [lat, lon] = item.weatherLocation.coords;
      const weekWeatherFromApi = await getWeatherFromApi({ lon, lat, postId: item._id });

      // Переход к следующему запросу если нет данных о погоде.
      if (!weekWeatherFromApi) {
        continue;
      }

      const weather = createCurrentWeatherForDB({
        weather: weekWeatherFromApi,
        startDate: item.startDate,
      });

      // Если есть прогноз погоды для startDate, то добавляем в массив обновления.
      if (weather) {
        weathersForDB.push(weather);
      }
    }

    // Создание/обновление данных о погоде в базе данных.
    await upsertWeatherWeek(weathersForDB);
  } catch (error) {
    errorHandler(error);
  }
}
