import { errorHandler } from '../errors/error.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';
import { WeatherWeek } from '../model/WeatherWeek.js';

// сохранение/обновление данных погоды в актуальных объявлениях о заездах
export async function saveWeatherWeek(arrayWeather: IWeatherWeek[]) {
  try {
    const savedWeather = await WeatherWeek.findOne();
    if (savedWeather) {
      await WeatherWeek.findByIdAndUpdate(savedWeather.id, { list: arrayWeather });
    } else {
      const weatherWeek = new WeatherWeek({ list: arrayWeather });
      await weatherWeek.save();
    }
  } catch (error) {
    errorHandler(error);
  }
}
