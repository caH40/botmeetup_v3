import { IBotContext } from '../../../../interface/context.interface.js';

import { errorHandler } from '../../../../errors/error.js';
import { sendRestart } from '../../../../telegram/reply/restart.js';
import { mainMenu } from '../../../../modules/mainmenu.js';

// обработка введенного текста в сцене Location
export async function handlerSceneDescription(ctx: IBotContext, text: string) {
  try {
    if (ctx.session && ctx.session.start) {
      // обнуление места старта (location) в сессии
      ctx.session.description = text;
      ctx.session.start.inline_keyboard[3][1].text = 'Описание  ✔️';
    } else {
      // отправка сообщения о необходимости перезапуска сессии
      await sendRestart(ctx);

      return;
    }

    // возврат в главное меню
    await mainMenu(ctx, { type: 'creating', isNew: true });
  } catch (error) {
    errorHandler(error);
  }
}
