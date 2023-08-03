import { Context } from 'telegraf';

import { SessionData } from './session.interface.js';

// создание интерфейса для контекста телеграфа
export interface IBotContext extends Context {
  session?: SessionData;
}
