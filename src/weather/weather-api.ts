import 'dotenv/config';
import axios from 'axios';

import { createLocationsWeather } from './locations.js';
import { saveWeatherWeek } from './weatherweek-save.js';
import { API_KEY_WEATHER } from '../config/dotenv.js';
import { conversionDays } from '../common/weekdays.js';
import { IWeatherDaily } from '../interface/weather.js';
import { errorHandler } from '../errors/error.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';

export async function weatherFromApi() {
  try {
    const locationsWeather = await createLocationsWeather();
    // если нет городов для мониторинга погоды, то выход из функции
    if (!locationsWeather || !locationsWeather.length) {
      return;
    }
    //массив для сохранения в БД
    const arrayWeather: IWeatherWeek[] = [];

    for (let indexCity = 0; indexCity < locationsWeather.length; indexCity++) {
      const { lon, lat } = locationsWeather[indexCity];

      const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&exclude=hourly&units=metric&lang=ru`;

      const response = await axios(requestUrl);
      // если ответ от сервера не 200, то переход к следующему запросу
      if (response.status !== 200) {
        continue;
      }

      const daily: IWeatherDaily[] = response.data.daily;

      // quantityDays количество дней с погодой получаемых в daily
      const quantityDays = 8;
      for (let indexDay = 0; indexDay < quantityDays; indexDay++) {
        const weatherDate = new Date(daily[indexDay].dt * 1000).toLocaleDateString();
        const weatherTempDay = daily[indexDay].temp.day;
        const weatherTempMorn = daily[indexDay].temp.morn;
        const weatherTempEve = daily[indexDay].temp.eve;
        const weatherHumidity = daily[indexDay].humidity;
        const weatherWindSpeed = daily[indexDay].wind_speed;

        const weatherInDay = daily[indexDay].weather[0];
        const weatherDescription = weatherInDay
          ? weatherInDay.description
          : 'нет описания погоды';

        const dayWeather: number = new Date(daily[indexDay].dt * 1000).getDay();
        const dateUpdate = new Date().toLocaleString();

        const dayWeatherForDB: IWeatherWeek = {
          dateUpdate: dateUpdate,
          date: weatherDate,
          dateString: conversionDays.get(dayWeather),
          city: locationsWeather[indexCity],
          tempMorn: weatherTempMorn,
          tempDay: weatherTempDay,
          tempEve: weatherTempEve,
          humidity: weatherHumidity,
          windSpeed: weatherWindSpeed,
          desc: weatherDescription,
        };
        // формирование массива погоды с отфильтрованными данными
        arrayWeather.push(dayWeatherForDB);
      }
    }

    //обновление данных о погоде в базе данных, если нет, то создает новую коллекцию
    await saveWeatherWeek(arrayWeather);
  } catch (error) {
    errorHandler(error);
  }
}
