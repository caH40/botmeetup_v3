import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';

const { leave } = Scenes.Stage;

import { IBotContext } from '../../../../interface/context.interface.js';
import { sceneLocationText as txt } from './text.js';
import { sendReply } from '../../../../reply/reply.js';
import { handlerScenePicture } from './handler.js';
import { saveMessageIdForDel } from '../../../../modules/message-delete.js';

export const pictureScene = new Scenes.BaseScene<IBotContext>('picture');

pictureScene.enter(async (ctx) => {
  // удаление меню, что бы после возврата из сессии сделать новое
  await ctx.deleteMessage();
  const response = await sendReply(ctx, txt.greeting);

  // сохранение id сообщения для последующего удаления
  saveMessageIdForDel(ctx, response.message_id);
});

pictureScene.command('quit', leave<IBotContext>());

pictureScene.on(message('photo'), async (ctx) => {
  // данные получены, выход из сцены
  ctx.scene.leave();
  // обработка полученных данных (текста описания)
  const pictureId = ctx.message.photo[2].file_id;
  await handlerScenePicture(ctx, pictureId);
});

// если пользователь загрузил не картинку,
// то предыдущий блок игнорируется и срабатывает данный обработчик
pictureScene.on('message', async (ctx) => {
  await ctx.deleteMessage();

  await sendReply(ctx, txt.wrong);
});
