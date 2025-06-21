import { Types } from 'mongoose';
import { IWeatherWeek } from '../interface/model/weatherweek.interface';
import { TWeatherForecast } from '../interface/weather.types';
import { millisecondsInSeconds } from '../common/constants.js';

export function createWeatherObjectForDB(
  weather: TWeatherForecast & { postId: Types.ObjectId }
): IWeatherWeek[] {
  return weather.list.map((day) => {
    return {
      post: weather.postId,
      date: new Date(day.dt * millisecondsInSeconds),
      temp: day.main.temp,
      humidity: day.main.humidity,
      pressure: day.main.pressure,
      wind: day.wind,
      clouds: day.clouds,
      weather: day.weather[0],
    };
  });
}
