import { InlineKeyboardMarkup } from 'telegraf/types';

// описание сессии
export interface SessionData {
  channelName: string;
  channelId: number;
  linkedChatId: number | undefined;
  messageDel: [];
  start: InlineKeyboardMarkup;
  dateStart: string;
  time: string;
  distance: string;
}
