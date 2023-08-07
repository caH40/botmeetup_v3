import { Context, Scenes, session, Telegraf } from 'telegraf';
import { BOT_TOKEN } from './config/dotenv.js';

/**
 * Можно расширить объект сеанса, доступный для каждой сцены.
 * * Это можно сделать, расширив `SceneSessionData` и, в свою очередь, передав свои собственные
 * интерфейс в качестве переменной типа для `SceneSession` и `SceneContextScene`.
 */
interface MySceneSession extends Scenes.SceneSessionData {
  // will be available under `ctx.scene.session.mySceneSessionProp`
  mySceneSessionProp: number;
}
/**
 * Мы все еще можем расширить обычный объект session, который мы можем использовать в контексте
 *. Однако, поскольку мы используем сцены, мы должны расширить их
 * `Сценарная сессия`.
 *
 * * Можно передать переменную типа в `SceneSession`, если вы также хотите
 * продлите сеанс съемки сцены, как мы делали выше.
 */
interface MySession extends Scenes.SceneSession<MySceneSession> {
  // will be available under `ctx.session.mySessionProp`
  mySessionProp: number;
}
/**
 * * Теперь, когда у нас есть наш объект session, мы можем определить наш собственный контекстный объект.
 *
 * Как всегда, если мы также хотим использовать наш собственный объект session, мы должны установить его
 * здесь, в свойстве `сеанс`. Кроме того, теперь мы также должны установить объект
 * scene в свойстве `scene`. Поскольку мы расширяем сеанс сцены, нам
 * нужно еще раз передать тип в качестве переменной типа.
 */
interface MyContext extends Context {
  // will be available under `ctx.myContextProp`
  myContextProp: string;

  // declare session type
  session: MySession;
  // declare scene type
  scene: Scenes.SceneContextScene<MyContext, MySceneSession>;
}

// Handler factories
const { enter, leave } = Scenes.Stage;

// Greeter scene
const greeterScene = new Scenes.BaseScene<MyContext>('greeter');
greeterScene.enter((ctx) => ctx.reply('Hi'));
greeterScene.leave((ctx) => ctx.reply('Bye'));
greeterScene.hears('hi', enter<MyContext>('greeter'));
greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'));

// Echo scene
const echoScene = new Scenes.BaseScene<MyContext>('echo');
echoScene.enter((ctx) => ctx.reply('echo scene'));
echoScene.leave((ctx) => ctx.reply('exiting echo scene'));
echoScene.command('back', leave<MyContext>());
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text));
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'));

const bot = new Telegraf<MyContext>(BOT_TOKEN);

const stage = new Scenes.Stage<MyContext>([greeterScene, echoScene], {
  ttl: 10,
});
bot.use(session());
bot.use(stage.middleware());
bot.use((ctx, next) => {
  // we now have access to the the fields defined above
  ctx.myContextProp ??= '';
  ctx.session.mySessionProp ??= 0;
  ctx.scene.session.mySceneSessionProp ??= 0;
  return next();
});
bot.command('greeter', (ctx) => ctx.scene.enter('greeter'));
bot.command('echo', (ctx) => ctx.scene.enter('echo'));
bot.on('message', (ctx) => ctx.reply('Try /echo or /greeter'));
bot.launch();
