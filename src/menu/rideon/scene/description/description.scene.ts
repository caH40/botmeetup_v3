import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';

const { leave } = Scenes.Stage;

import { IBotContext } from '../../../../interface/context.interface.js';
import { sceneLocationText as txt } from './text.js';
import { sendReply } from '../../../../telegram/reply/reply.js';
import { handlerSceneDescription } from './handler.js';
import { saveMessageIdForDel } from '../../../../modules/message-delete.js';

export const descriptionScene = new Scenes.BaseScene<IBotContext>('description');

descriptionScene.enter(async (ctx) => {
  // удаление меню, что бы после возврата из сессии сделать новое
  await ctx.deleteMessage();
  const response = await sendReply(ctx, txt.greeting);
  // сохранение id сообщения для последующего удаления
  saveMessageIdForDel(ctx, response.message_id);
  // при изменении описания показывается предыдущее, для возможности скопировать предыдущее описание
  if (ctx.session.description) {
    await sendReply(ctx, `${txt.prevDescription}${ctx.session.description}`, true);
  }
});

descriptionScene.command('quit', leave<IBotContext>());

descriptionScene.on(message('text'), async (ctx) => {
  // данные получены, выход из сцены
  ctx.scene.leave();

  // обработка полученных данных (текста описания)
  const text = ctx.message.text;
  await handlerSceneDescription(ctx, text);
});
