import { Types } from 'mongoose';
import { IWeatherWeek } from '../interface/model/weatherweek.interface';
import { TWeatherForecast } from '../interface/weather.types';
import { millisecondsInSecond } from '../common/constants.js';
import { isSameDay } from './time-left.js';

type Params = {
  weather: TWeatherForecast & { postId: Types.ObjectId };
  startDate: Date;
};

export function createCurrentWeatherForDB({ weather, startDate }: Params): IWeatherWeek | null {
  // Поиск погоды для даты старта заезда startDate.
  const currentWeather = weather.list.find((item) => {
    const itemDate = new Date(item.dt * millisecondsInSecond); // если dt в секундах!
    return isSameDay(itemDate, startDate);
  });

  if (!currentWeather) {
    return null;
  }

  return {
    post: weather.postId,
    date: new Date(currentWeather.dt * millisecondsInSecond),
    temp: currentWeather.main.temp,
    humidity: currentWeather.main.humidity,
    pressure: currentWeather.main.pressure,
    wind: currentWeather.wind,
    clouds: currentWeather.clouds,
    weather: currentWeather.weather[0],
  };
}
