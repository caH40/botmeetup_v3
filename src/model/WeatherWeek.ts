import pkg from 'mongoose';
import { TWeatherWeekDocument } from '../interface/model/weatherweek.interface.js';
import mongoose from 'mongoose';

const { Schema, model } = pkg;

const weatherWeekSchema = new Schema<TWeatherWeekDocument>(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    date: { type: Date },
    temp: Number,
    pressure: Number,
    humidity: Number,
    wind: { speed: Number, deg: Number, gust: Number },
    clouds: { all: Number },
    weather: {
      id: Number,
      main: String,
      description: String,
      icon: String,
    },
  },
  {
    timestamps: true,
  }
);

export const WeatherWeek = model<TWeatherWeekDocument>('WeatherWeeks', weatherWeekSchema);
