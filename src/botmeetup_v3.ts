import { Scenes, Telegraf, session } from 'telegraf';
// import { callbackQuery } from 'telegraf/filters';
// import { message } from 'telegraf/filters';

import { BOT_TOKEN } from './config/dotenv.js';
import { IBotContext } from './interface/context.interface.js';
import { commands } from './commands/commands.js';
import { initMongodb } from './database/mongodb.js';
import { checkMember } from './middleware/member.js';
import { actions } from './actions/actions.js';
import { locationScene } from './menu/rideon/scene/location/location.scene.js';

// запуск mongoose подключения к БД
initMongodb();

const bot = new Telegraf<IBotContext>(BOT_TOKEN);

const stage = new Scenes.Stage<IBotContext>([locationScene]);

bot.use(session());
bot.use(checkMember);
bot.use(stage.middleware());
// bot.use((ctx, next) => {
//   // we now have access to the the fields defined above
//   ctx.myContextProp ??= '';
//   ctx.session.mySessionProp ??= 0;
//   ctx.scene.session.mySceneSessionProp ??= 0;
//   return next();
// });

bot.command('greeter', (ctx) => ctx.scene.enter('greeter'));
bot.command('location', (ctx: IBotContext) => ctx.scene.enter('location'));

for (const command of commands(bot)) {
  command;
}
for (const action of actions(bot)) {
  action;
}

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
