import { IBotContext } from '../interface/context.interface.js';
import { IPost } from '../interface/model/post.interface.js';
import { IPostData } from '../interface/postdata.interdace.js';

// создание объекта с данными о заезде, сохраненными в session
export const createPostData = (ctx: IBotContext): IPostData => {
  return {
    description: ctx.session.description,
    locationName: ctx.session.locationName,
    locationCoords: ctx.session.locationCoords,
    dateStart: ctx.session.dateStart,
    time: ctx.session.time,
    distance: ctx.session.distance,
    speed: ctx.session.speed,
    locationWeatherName: ctx.session.locationWeatherName,
    locationWeatherCoords: ctx.session.locationWeatherCoords,
    leader: ctx.session.leader,
  };
};

export const createPostDataFromDB = (postDB: IPost, pollQuantity: number): IPostData => {
  return {
    description: postDB.description,
    locationName: postDB.locationName,
    locationCoords: postDB.locationCoords,
    dateStart: postDB.date,
    time: postDB.time,
    distance: postDB.distance,
    speed: postDB.speed,
    locationWeatherName: postDB.locationWeatherName,
    locationWeatherCoords: postDB.locationWeatherCoords,
    leader: postDB.leader,
    pollQuantity: String(pollQuantity),
    tempDay: postDB.tempDay,
    humidity: postDB.humidity,
    descriptionWeather: postDB.descriptionWeather,
  };
};
