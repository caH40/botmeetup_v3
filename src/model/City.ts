// модель для базы всех городов России
import { Schema, model } from 'mongoose';

const citySchema = new Schema({
  name: { type: String },
  lon: { type: Number },
  lat: { type: Number },
});

export const City = model('City', citySchema);
