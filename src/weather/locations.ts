import { errorHandler } from '../errors/error.js';
import { ICities } from '../interface/model/cities.interface.js';
import { City } from '../model/City.js';
import { Post } from '../model/Post.js';

// получение данных городов (широта, долгота) из БД, которые указаны в актуальных объявлениях о велозаездах
export async function createLocationsWeather() {
  try {
    // выборка из актуальных постов (заезды еще не состоялись) города мониторинга погоды
    const postsDB = await Post.find({ isLastUpdated: false });

    // коллекция с названиями городов из актуальных объявлений
    const locationsWeather = new Set();

    for (const post of postsDB) {
      if (post.locationWeather) {
        locationsWeather.add(post.locationWeather);
      }
    }

    // массив с данными (широта,долгота) городов из актуальных объявлений
    const result: ICities[] = [];
    for (const locationWeather of locationsWeather) {
      const cityDB: ICities | null = await City.findOne({ name: locationWeather });
      if (cityDB) {
        result.push(cityDB);
      }
    }

    return result;
  } catch (error) {
    errorHandler(error);
  }
}
