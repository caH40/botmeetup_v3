import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';
import { WeatherWeek } from '../model/WeatherWeek.js';
import { formWeather } from '../modules/forms/weather.js';

//!! делается запрос погоды из базы при каждой итерации(количество объявлений), необходимо это исправить

export async function getWeather(date: string, location: string) {
  const weatherDB = await WeatherWeek.find();
  //если нет данных в БД, то выход
  if (!weatherDB.length) {
    return {};
  }

  const weatherCurrent: IWeatherWeek | undefined = weatherDB.find(
    (elm) => elm.date == date && elm.city.name === location
  );

  //формирование строки для сообщения в телеге
  const formWeatherStr = formWeather(weatherCurrent);

  return { formWeatherStr, weatherCurrent };
}
