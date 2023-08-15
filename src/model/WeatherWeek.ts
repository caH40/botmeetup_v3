import pkg from 'mongoose';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';

const { Schema, model } = pkg;

const weatherWeekSchema = new Schema<IWeatherWeek>({
  dateUpdate: String,
  date: String,
  dateString: String,
  city: {},
  tempMorn: Number,
  tempDay: Number,
  tempEve: Number,
  humidity: Number,
  windSpeed: Number,
  desc: String,
});

export const WeatherWeek = model<IWeatherWeek>('WeatherWeeks', weatherWeekSchema);
