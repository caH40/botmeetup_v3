import { Telegraf, session } from 'telegraf';

import { BOT_TOKEN } from './config/dotenv.js';
import { IBotContext } from './interface/context.interface.js';
import { commands } from './commands/commands.js';
import { initMongodb } from './database/mongodb.js';
import { checkMember } from './middleware/member.js';
import { getActionDate } from './menu/rideon/action/date.js';
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
// bot.on('callback_query', (ctx) => console.log(ctx.callbackQuery));
getActionDate(bot);

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
