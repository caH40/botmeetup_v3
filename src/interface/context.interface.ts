import { Context, Scenes } from 'telegraf';

import { SessionData, MySceneSession } from './session.interface.js';

// создание интерфейса для контекста телеграфа
export interface IBotContext extends Context {
  session: SessionData;
  scene: Scenes.SceneContextScene<IBotContext, MySceneSession>;
}
