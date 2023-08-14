import { IBotContext } from '../../../../interface/context.interface.js';

import { errorHandler } from '../../../../errors/error.js';
import { sendRestart } from '../../../../reply/restart.js';
import { mainMenu } from '../../../../modules/mainmenu.js';

// обработка введенного текста в сцене Location
export async function handlerScenePicture(ctx: IBotContext, pictureId: string) {
  try {
    if (ctx.session && ctx.session.start) {
      // обнуление места старта (location) в сессии
      ctx.session.pictureId = pictureId;
      ctx.session.start.inline_keyboard[3][0].text = 'Картинка ✔️';
    } else {
      // отправка сообщения о необходимости перезапуска сессии
      await sendRestart(ctx);

      return;
    }

    // возврат в главное меню
    await mainMenu(ctx, true);
  } catch (error) {
    errorHandler(error);
  }
}
