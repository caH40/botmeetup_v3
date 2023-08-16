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
import { locationWeatherScene } from './menu/rideon/scene/location_weather/location_weather.scene.js';
import { descriptionScene } from './menu/rideon/scene/description/description.scene.js';
import { pictureScene } from './menu/rideon/scene/picture/picture.scene.js';
import { controlForwardMessage } from './middleware/forward-message.js';
import { pollHandler } from './modules/poll.js';
import { weatherUpdate } from './weather/weather-update.js';

// запуск mongoose подключения к БД
initMongodb();

const bot = new Telegraf<IBotContext>(BOT_TOKEN);

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
bot.on('poll_answer', async (ctx) => await pollHandler(ctx));

// обработка команд
for (const command of commands(bot)) {
  command;
}
// обработка экшенов
for (const action of actions(bot)) {
  action;
}

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
