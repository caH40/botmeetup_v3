import pkg from 'mongoose';

const { Schema, model } = pkg;

const weatherWeekSchema = new Schema({
  list: [
    {
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
    },
  ],
});

export const WeatherWeek = model('WeatherWeeks', weatherWeekSchema);
