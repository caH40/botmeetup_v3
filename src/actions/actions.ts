import { Telegraf } from 'telegraf';

import { IBotContext } from '../interface/context.interface.js';
import { getActionDate } from '../menu/rideon/action/date.js';
import { getActionDateStart } from '../menu/rideon/action/date-start.js';

// объединение всех action в один массив
export const actions = (bot: Telegraf<IBotContext>): void[] => [
  getActionDate(bot),
  getActionDateStart(bot),
];
