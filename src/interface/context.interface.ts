import { Context, Scenes } from 'telegraf';

import { SessionData } from './session.interface.js';
import { MySceneSession } from './new.interface.js';

// создание интерфейса для контекста телеграфа
export interface IBotContext extends Context {
  myContextProp: string;
  session: SessionData;
  scene: Scenes.SceneContextScene<IBotContext, MySceneSession>;
}
