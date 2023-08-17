import { Types } from 'mongoose';

import { Post } from '../../model/Post.js';
import { IWeatherWeek } from '../../interface/model/weatherweek.interface.js';
import { errorHandler } from '../../errors/error.js';

// обновление данных в БД в Post
export const updateWeatherDB = async (
  _id: Types.ObjectId | undefined,
  weatherCurrent: IWeatherWeek | undefined
): Promise<void> => {
  await Post.findOneAndUpdate(
    { _id },
    {
      $set: {
        tempDay: weatherCurrent ? weatherCurrent.tempDay : '',
        humidity: weatherCurrent ? weatherCurrent.humidity : '',
        descriptionWeather: weatherCurrent ? weatherCurrent.desc : '',
      },
    }
  ).catch((error) => errorHandler(error));
};
