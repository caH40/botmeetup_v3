import { getLocationsWeather } from './locations.js';
import { saveWeatherWeek } from './weatherweek-save.js';
import { errorHandler } from '../errors/error.js';
import { getWeatherFromApi } from '../api/openweather.js';
import { getWeatherForDB } from './weather-for-db.js';

import { IWeatherDaily } from '../interface/weather.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';

export async function getWeatherForActualPosts(): Promise<void> {
  try {
    // получение городов из актуальных постов (заезды еще не состоялись) для мониторинга погоды
    const locationsWeather = await getLocationsWeather();

    // если нет городов для мониторинга погоды, то выход из функции
    if (!locationsWeather || !locationsWeather.length) {
      return;
    }

    //массив для сохранения в БД
    const weathersForDB: IWeatherWeek[] = [];

    // запрос погоды для актуальных объявлений о велозаездах
    for (let indexCity = 0; indexCity < locationsWeather.length; indexCity++) {
      const { lon, lat } = locationsWeather[indexCity];
      const weatherApi = await getWeatherFromApi(lon, lat);
      // если ответ от сервера не 200, то переход к следующему запросу
      if (weatherApi.status !== 200) {
        continue;
      }

      const daily: IWeatherDaily[] = weatherApi.data.daily;
      // формирование массива погоды за 8 дней для определенного города
      const weatherForDB = getWeatherForDB(daily, locationsWeather[indexCity]);
      weathersForDB.push(...weatherForDB);
    }

    //обновление данных о погоде в базе данных, если нет, то создает новую коллекцию
    await saveWeatherWeek(weathersForDB);
  } catch (error) {
    errorHandler(error);
  }
}
