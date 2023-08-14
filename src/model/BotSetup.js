// настройки для определенного канала
import pkg from 'mongoose';
const { Schema, model } = pkg;

const botSetupSchema = new Schema({
  ownerId: { type: Number },
  channelId: { type: Number, unique: true },
  channelTitle: { type: String },
  channelName: { type: String },
  groupId: { type: Number, unique: true },
  groupTitle: { type: String },
  apiKeyWeather: { type: String },
});

export const BotSetup = model('BotSetup', botSetupSchema);
