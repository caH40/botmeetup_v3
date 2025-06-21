import { errorHandler } from '../errors/error.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';
import { WeatherWeek } from '../model/WeatherWeek.js';

// сохранение/обновление данных погоды в актуальных объявлениях о заездах
export async function saveWeatherWeek(arrayWeather: IWeatherWeek[]) {
  try {
    // очистка коллекции от документов
    await WeatherWeek.deleteMany();

    // сохранение всех документов из массива
    await WeatherWeek.insertMany(arrayWeather);
  } catch (error) {
    errorHandler(error);
  }
}
