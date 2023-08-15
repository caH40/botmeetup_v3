import { conversionDays } from '../common/weekdays.js';
import { ICities } from '../interface/model/cities.interface.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';
import { IWeatherDaily } from '../interface/weather.js';

export const getWeatherForDB = (daily: IWeatherDaily[], city: ICities) => {
  const weatherForDB: IWeatherWeek[] = [];
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
    const weatherDescription = weatherInDay ? weatherInDay.description : 'нет описания погоды';

    const dayWeather: number = new Date(daily[indexDay].dt * 1000).getDay();
    const dateUpdate = new Date().toLocaleString();

    const dayWeatherForDB: IWeatherWeek = {
      dateUpdate: dateUpdate,
      date: weatherDate,
      dateString: conversionDays.get(dayWeather),
      city,
      tempMorn: weatherTempMorn,
      tempDay: weatherTempDay,
      tempEve: weatherTempEve,
      humidity: weatherHumidity,
      windSpeed: weatherWindSpeed,
      desc: weatherDescription,
    };
    // формирование массива погоды с отфильтрованными данными
    weatherForDB.push(dayWeatherForDB);
  }

  return weatherForDB;
};
