import { Scenes } from 'telegraf';

import { InlineKeyboardMarkup } from 'telegraf/types';
import { TGeoCoords } from './index.types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MySceneSession extends Scenes.SceneSessionData {
  // will be available under `ctx.scene.session.mySceneSessionProp`
  // mySceneSessionProp: number;
}

// описание сессии
export interface SessionData extends Scenes.SceneSession<MySceneSession> {
  channelName: string;
  channelId: number;
  linkedChatId: number | undefined;
  messageDel: number[];
  start: InlineKeyboardMarkup | undefined;
  dateStart: string;
  time: string;
  distance: string;
  speed: string;
  startLocation: {
    name: string;
    coords: TGeoCoords;
  };
  weatherLocation: {
    name: string;
    coords: TGeoCoords;
  };
  description: string;
  pictureId: string;
  leader: string;
  userId: number;
  postId: string;
}
