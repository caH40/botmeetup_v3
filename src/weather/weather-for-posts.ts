import { saveWeatherWeek } from './weatherweek-save.js';
import { errorHandler } from '../errors/error.js';
import { getWeatherFromApi } from '../api/openweather.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';
import { getWeatherLocationCoords } from './weather-coords.js';
import { createWeatherObjectForDB } from '../utils/weather.js';

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
    if (!weatherLocationCoords || !weatherLocationCoords.length) {
      return;
    }

    //массив для сохранения в БД
    const weathersForDB: IWeatherWeek[] = [];

    // запрос погоды для актуальных объявлений о велозаездах
    for (const item of weatherLocationCoords) {
      const [lat, lon] = item.weatherLocation.coords;
      const weatherApi = await getWeatherFromApi({ lon, lat, postId: item._id });
      // Переход к следующему запросу если нет данных о погоде.
      if (!weatherApi) {
        continue;
      }

      const weather = createWeatherObjectForDB(weatherApi);

      weathersForDB.push(...weather);
    }

    //обновление данных о погоде в базе данных, если нет, то создает новую коллекцию
    await saveWeatherWeek(weathersForDB);
  } catch (error) {
    errorHandler(error);
  }
}
