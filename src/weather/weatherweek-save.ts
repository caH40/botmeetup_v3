import { errorHandler } from '../errors/error.js';
import { IWeatherWeek } from '../interface/model/weatherweek.interface.js';
import { WeatherWeek } from '../model/WeatherWeek.js';

/**
 * Создание/обновление данных о погоде в базе данных.
 */
export async function upsertWeatherWeek(arrayWeather: IWeatherWeek[]): Promise<void> {
  try {
    // Сохранение всех документов из массива.
    await WeatherWeek.bulkWrite(
      arrayWeather.map((doc) => ({
        updateOne: {
          filter: { _id: doc.post },
          update: { $set: doc },
          upsert: true,
        },
      }))
    );
  } catch (error) {
    errorHandler(error);
  }
}
