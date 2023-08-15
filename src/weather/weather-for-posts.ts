import { createLocationsWeather } from './locations.js';
import { saveWeatherWeek } from './weatherweek-save.js';

import { IWeatherDaily } from '../interface/weather.js';
import { errorHandler } from '../errors/error.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';
import { getWeatherFromApi } from '../api/openweather.js';
import { getWeatherForDB } from './weather-for-db.js';

export async function getWeatherForActualPosts() {
  try {
    const locationsWeather = await createLocationsWeather();
    // если нет городов для мониторинга погоды, то выход из функции
    if (!locationsWeather || !locationsWeather.length) {
      return;
    }
    //массив для сохранения в БД
    let weatherForDB: IWeatherWeek[] = [];

    for (let indexCity = 0; indexCity < locationsWeather.length; indexCity++) {
      const { lon, lat } = locationsWeather[indexCity];
      const weatherApi = await getWeatherFromApi(lon, lat);
      // если ответ от сервера не 200, то переход к следующему запросу
      if (weatherApi.status !== 200) {
        continue;
      }

      const daily: IWeatherDaily[] = weatherApi.data.daily;
      // формирование массива погоды за 8 дней для определенного города
      weatherForDB = getWeatherForDB(daily, locationsWeather[indexCity]);
    }

    //обновление данных о погоде в базе данных, если нет, то создает новую коллекцию
    await saveWeatherWeek(weatherForDB);
  } catch (error) {
    errorHandler(error);
  }
}
