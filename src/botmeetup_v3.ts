import { Telegraf, session } from 'telegraf';
// import { callbackQuery } from 'telegraf/filters';

import { BOT_TOKEN } from './config/dotenv.js';
import { IBotContext } from './interface/context.interface.js';
import { commands } from './commands/commands.js';
import { initMongodb } from './database/mongodb.js';
import { checkMember } from './middleware/member.js';
import { actions } from './actions/actions.js';

// запуск mongoose подключения к БД
initMongodb();
// Create your bot and tell it about your context type
const bot = new Telegraf<IBotContext>(BOT_TOKEN);

bot.use(session());
bot.use(checkMember);

for (const command of commands(bot)) {
  command;
}
for (const action of actions(bot)) {
  action;
}
// bot.on(callbackQuery('data'), (ctx) => console.log(ctx.callbackQuery.data));

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
