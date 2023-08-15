import { ICities } from './cities.interface.js';

export interface IWeatherWeek {
  dateUpdate: string;
  date: string;
  dateString?: string;
  city: ICities;
  tempMorn: number;
  tempDay: number;
  tempEve: number;
  humidity: number;
  windSpeed: number;
  desc: string;
}
