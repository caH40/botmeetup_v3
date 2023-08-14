import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';

const { leave } = Scenes.Stage;

import { handlerSceneLocation } from './handler.js';
import { IBotContext } from '../../../../interface/context.interface.js';
import { sceneLocationText as txt } from './text.js';

export const locationScene = new Scenes.BaseScene<IBotContext>('location');
locationScene.enter(async (ctx) => {
  // удаление меню, что бы после возврата из сессии сделать новое
  await ctx.deleteMessage();

  await ctx.reply(txt.choosingCity);
});

locationScene.command('quit', leave<IBotContext>());

locationScene.on(message('text'), async (ctx) => {
  const text = ctx.message.text;
  await handlerSceneLocation(ctx, text);
});
