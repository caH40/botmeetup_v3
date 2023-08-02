import { Context } from 'telegraf';

export interface SessionData {
  channelName: string;
  channelId: number;
  linkedChatId: number | undefined;
}

// создание интерфейса для контекста телеграфа
export interface IBotContext extends Context {
  session?: SessionData;
}
