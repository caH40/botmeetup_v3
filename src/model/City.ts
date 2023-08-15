// модель для базы всех городов России
import { Schema, model } from 'mongoose';
import { ICities } from '../interface/model/cities.interface.js';

const citySchema = new Schema<ICities>({
  name: { type: String },
  lon: { type: Number },
  lat: { type: Number },
});

export const City = model<ICities>('City', citySchema);
