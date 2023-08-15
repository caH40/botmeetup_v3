import { Types } from 'mongoose';

export interface ICities {
  _id?: Types.ObjectId;
  name: string;
  lon: number;
  lat: number;
  __v?: number;
}
