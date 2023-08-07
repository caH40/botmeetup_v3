import { Scenes } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';
import { MySceneSession } from './new.interface.js';

// описание сессии
export interface SessionData extends Scenes.SceneSession<MySceneSession> {
  channelName: string;
  channelId: number;
  linkedChatId: number | undefined;
  messageDel: [];
  start: InlineKeyboardMarkup | undefined;
  dateStart: string;
  time: string;
  distance: string;
  speed: string;

  mySessionProp: number;
}
