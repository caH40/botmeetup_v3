import { Document, Types } from 'mongoose';

export type TWeatherWeekDocument = IWeatherWeek & Document;

export interface IWeatherWeek {
  post: Types.ObjectId; // Ссылка на документ Объявления о велозаезде.
  date: Date;
  temp: number;
  humidity: number;
  pressure: number;
  wind: { speed: number; deg: number; gust: number };
  clouds: { all: number };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  createAt?: Date;
  updateAt?: Date;
}
