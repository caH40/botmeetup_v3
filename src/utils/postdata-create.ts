import { IBotContext } from '../interface/context.interface.js';
import { IPost } from '../interface/model/post.interface.js';
import { IPostData } from '../interface/postdata.interdace.js';

// создание объекта с данными о заезде, сохраненными в session
export const createPostData = (ctx: IBotContext): IPostData => {
  return {
    description: ctx.session.description,
    location: ctx.session.location,
    dateStart: ctx.session.dateStart,
    time: ctx.session.time,
    distance: ctx.session.distance,
    speed: ctx.session.speed,
    locationWeather: ctx.session.locationWeather,
    leader: ctx.session.leader,
  };
};
export const createPostDataFromDB = (postDB: IPost, pollQuantity: number): IPostData => {
  return {
    description: postDB.description,
    location: postDB.locationStart,
    dateStart: postDB.date,
    time: postDB.time,
    distance: postDB.distance,
    speed: postDB.speed,
    locationWeather: postDB.locationWeather,
    leader: postDB.leader,
    pollQuantity: String(pollQuantity),
    tempDay: postDB.tempDay,
    humidity: postDB.humidity,
    descriptionWeather: postDB.descriptionWeather,
  };
};
