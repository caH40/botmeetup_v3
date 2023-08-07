import { Scenes, Telegraf, session } from 'telegraf';
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
// Handler factories
const { enter, leave } = Scenes.Stage;

// Greeter scene
const greeterScene = new Scenes.BaseScene<IBotContext>('greeter');
greeterScene.enter((ctx) => ctx.reply('Hi'));
greeterScene.leave((ctx) => ctx.reply('Bye'));
greeterScene.hears('hi', enter<IBotContext>('greeter'));
greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'));

const bot = new Telegraf<IBotContext>(BOT_TOKEN);

const stage = new Scenes.Stage<IBotContext>([greeterScene], {
  ttl: 10,
});

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
