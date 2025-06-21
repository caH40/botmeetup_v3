import { Types } from 'mongoose';
import { TGeoCoords } from '../index.types';

export interface IPost {
  _id?: Types.ObjectId;

  botId: Types.ObjectId;
  date: string;
  time: string;
  leader: string;
  userId: string;
  startLocation: {
    name: string;
    coords: TGeoCoords;
  };
  weatherLocation: {
    name: string;
    coords: TGeoCoords;
  };
  distance: string;
  speed: string;
  photoId: string;
  description: string;
  messageId: number;
  messageIdGroup: number;
  messageIdWeather: number;
  //погода: температура днем, влажность, описание
  tempDay: string;
  humidity: string;
  descriptionWeather: string;
  isLastUpdated: boolean;
  isPattern: boolean;

  __v?: number;
}
