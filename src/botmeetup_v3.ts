import { BOT_TOKEN } from './config/dotenv.js';
import { Telegraf } from 'telegraf';
import { IBotContext } from './context/context.interface.js';

import { commands } from './commands/commands-all.js';

// Create your bot and tell it about your context type
const bot = new Telegraf<IBotContext>(BOT_TOKEN);

for (const command of commands(bot)) {
  command;
}

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
