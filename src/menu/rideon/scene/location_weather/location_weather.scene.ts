import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';

const { leave } = Scenes.Stage;

import { handlerSceneLocationWeather } from './handler.js';
import { IBotContext } from '../../../../interface/context.interface.js';
import { sceneLocationText as txt } from './text.js';
import { sendReply } from '../../../../reply/reply.js';
import { saveMessageIdForDel } from '../../../../modules/message-delete.js';

export const locationWeatherScene = new Scenes.BaseScene<IBotContext>('weather');
locationWeatherScene.enter(async (ctx) => {
  // удаление меню, что бы после возврата из сессии сделать новое
  await ctx.deleteMessage();

  const response = await sendReply(ctx, txt.choosingCity);
  // сохранение id сообщения для последующего удаления
  saveMessageIdForDel(ctx, response.message_id);
});

locationWeatherScene.command('quit', leave<IBotContext>());

locationWeatherScene.on(message('text'), async (ctx) => {
  await ctx.deleteMessage();
  const text = ctx.message.text;
  await handlerSceneLocationWeather(ctx, text);
});
