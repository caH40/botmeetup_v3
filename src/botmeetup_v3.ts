import { Scenes, Telegraf, session } from 'telegraf';

import { BOT_TOKEN } from './config/dotenv.js';
import { IBotContext } from './interface/context.interface.js';
import { commands } from './commands/commands.js';
import { initMongodb } from './database/mongodb.js';
import { checkMember } from './middleware/member.js';
import { actions } from './actions/actions.js';
import { locationScene } from './menu/rideon/scene/location/location.scene.js';
import { locationWeatherScene } from './menu/rideon/scene/location_weather/location_weather.scene.js';
import { descriptionScene } from './menu/rideon/scene/description/description.scene.js';
import { pictureScene } from './menu/rideon/scene/picture/picture.scene.js';
import { controlForwardMessage } from './middleware/forward-message.js';
import { pollHandler } from './modules/poll.js';
import { weatherUpdate } from './modules/uptdates/weather-update.js';
import { updatePosts } from './modules/uptdates/post.js';
import { timers } from './modules/timer.js';
import { serverApp, port } from './server/express.js';

// запуск mongoose подключения к БД
initMongodb();

serverApp.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

export const bot = new Telegraf<IBotContext>(BOT_TOKEN);

const stage = new Scenes.Stage<IBotContext>([
  locationScene,
  locationWeatherScene,
  descriptionScene,
  pictureScene,
]);

bot.use(session());
bot.use(checkMember);
bot.use(controlForwardMessage);
bot.use(stage.middleware());

// для тестирования
bot.command('weather', async (ctx) => await weatherUpdate(ctx));
bot.command('post', async (ctx) => await updatePosts(ctx));

// контроль апдейтов голосования
bot.on('poll_answer', async (ctx) => await pollHandler(ctx));

// обработка команд
commands(bot);

// обработка экшенов
actions(bot);

timers(bot);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
