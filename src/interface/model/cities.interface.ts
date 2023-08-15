import { ObjectId } from 'mongoose';

export interface ICities {
  _id?: ObjectId;
  name: string;
  lon: number;
  lat: number;
  __v?: number;
}
