import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface.js';

import { commandRideOn } from './rideon.js';
import { commandStart } from './start.js';

// объединение всех bot.command в один массив
export const commands = (bot: Telegraf<IBotContext>): Array<void> => {
  return [commandRideOn(bot), commandStart(bot)];
};
