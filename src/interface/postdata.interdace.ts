import { TGeoCoords } from './index.types';

export interface IPostData {
  description?: string;
  startLocation?: {
    name: string;
    coords: TGeoCoords;
  };
  weatherLocation?: {
    name: string;
    coords: TGeoCoords;
  };
  dateStart?: string;
  time?: string;
  distance?: string;
  speed?: string;

  leader?: string;
  pollQuantity?: string;
  tempDay?: string;
  humidity?: string;
  descriptionWeather?: string;
}
