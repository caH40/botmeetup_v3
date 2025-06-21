import { Types } from 'mongoose';

export interface IPost {
  _id?: Types.ObjectId;

  botId: Types.ObjectId;
  date: string;
  time: string;
  leader: string;
  userId: string;
  locationName: string;
  locationCoords: [number, number];
  locationWeatherName: string;
  locationWeatherCoords: [number, number];
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
