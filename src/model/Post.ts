// Данные из сообщения Телеграм
import pkg from 'mongoose';
import { IPost } from '../interface/model/post.interface.js';

const { Schema, model } = pkg;

const postSchema = new Schema<IPost>({
  date: { type: String },
  time: { type: String },
  leader: { type: String },
  userId: { type: String },
  locationStart: { type: String },
  locationWeather: { type: String },
  distance: { type: String },
  speed: { type: String },
  photoId: { type: String },
  description: { type: String },
  messageId: { type: Number },
  messageIdGroup: { type: Number },
  messageIdWeather: { type: Number },
  //погода: температура днем, влажность, описание
  tempDay: { type: String },
  humidity: { type: String },
  descriptionWeather: { type: String },
  isLastUpdated: { type: Boolean },
  isPattern: { type: Boolean, default: true },
});

export const Post = model<IPost>('Post', postSchema);
