import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';

const { leave } = Scenes.Stage;

import { handlerSceneLocation } from './handler.js';
import { IBotContext } from '../../../../interface/context.interface.js';
import { sceneLocationText as txt } from './text.js';
import { sendReply } from '../../../../telegram/reply/reply.js';
import { saveMessageIdForDel } from '../../../../modules/message-delete.js';

export const locationScene = new Scenes.BaseScene<IBotContext>('location');
locationScene.enter(async (ctx) => {
  // удаление меню, что бы после возврата из сессии сделать новое
  await ctx.deleteMessage();

  const response = await sendReply(ctx, txt.choosingCity);
  // сохранение id сообщения для последующего удаления
  saveMessageIdForDel(ctx, response.message_id);
});

locationScene.command('quit', leave<IBotContext>());

locationScene.on(message('text'), async (ctx) => {
  await ctx.deleteMessage();
  const text = ctx.message.text;
  await handlerSceneLocation(ctx, text);
});
