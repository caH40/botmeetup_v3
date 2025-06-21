import { Types } from 'mongoose';

import { WeatherWeek } from '../model/WeatherWeek.js';
import { errorHandler } from '../errors/error.js';

export async function getWeather(postId: Types.ObjectId) {
  try {
    return await WeatherWeek.findOne({ post: postId }).lean();
  } catch (error) {
    errorHandler(error);
  }
}
