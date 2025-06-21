import { Types } from 'mongoose';

import { errorHandler } from '../errors/error.js';
import { Post } from '../model/Post.js';
import { TGeoCoords } from '../interface/index.types.js';

type TCoordFromDB = {
  weatherLocation: {
    name: string;
    coords: TGeoCoords;
  };
  _id: Types.ObjectId;
};

/**
 * Получение данных городов (широта, долгота) из БД, которые указаны в актуальных объявлениях о велозаездах.
 */
export async function getWeatherLocationCoords(): Promise<TCoordFromDB[] | void> {
  try {
    // Выборка из актуальных постов (заезды еще не состоялись) города мониторинга погоды.
    const postsDB = await Post.find({ isLastUpdated: false }, { weatherLocation: true }).lean<
      TCoordFromDB[]
    >();

    return postsDB;
  } catch (error) {
    errorHandler(error);
  }
}
