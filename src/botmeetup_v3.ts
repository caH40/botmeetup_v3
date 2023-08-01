import { Telegraf, session } from 'telegraf';

import { BOT_TOKEN } from './config/dotenv.js';
import { IBotContext } from './context/context.interface.js';
import { commands } from './commands/commands.js';
import { initMongodb } from './database/mongodb.js';
import { checkMember } from './middleware/member.js';

// запуск mongoose подключения к БД
initMongodb();
// Create your bot and tell it about your context type
const bot = new Telegraf<IBotContext>(BOT_TOKEN);

bot.use(session());
bot.use(checkMember);

for (const command of commands(bot)) {
  command;
}

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
