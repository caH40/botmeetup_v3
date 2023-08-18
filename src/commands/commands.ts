import { Telegraf } from 'telegraf';
import { IBotContext } from '../interface/context.interface.js';

import { commandRideOn } from './rideon.js';
import { commandStart } from './start.js';
import { commandHelp } from './help.js';
import { commandEdit } from './edit.js';

// объединение всех bot.command в один массив
export const commands = (bot: Telegraf<IBotContext>): Array<void> => {
  return [commandRideOn(bot), commandStart(bot), commandHelp(bot), commandEdit(bot)];
};
