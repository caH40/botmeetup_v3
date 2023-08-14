import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';

const { leave } = Scenes.Stage;

import { handlerSceneLocationWeather } from './handler.js';
import { IBotContext } from '../../../../interface/context.interface.js';
import { sceneLocationText as txt } from './text.js';

export const locationWeatherScene = new Scenes.BaseScene<IBotContext>('weather');
locationWeatherScene.enter(async (ctx) => {
  // удаление меню, что бы после возврата из сессии сделать новое
  await ctx.deleteMessage();

  await ctx.reply(txt.choosingCity);
});

locationWeatherScene.command('quit', leave<IBotContext>());

locationWeatherScene.on(message('text'), async (ctx) => {
  const text = ctx.message.text;
  await handlerSceneLocationWeather(ctx, text);
});
