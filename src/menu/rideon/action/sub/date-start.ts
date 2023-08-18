import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';
import { mainMenu } from '../../../../modules/mainmenu.js';
import { regular } from '../../../../common/constants.js';
import { sendRestart } from '../../../../reply/restart.js';
import { errorHandler } from '../../../../errors/error.js';

// обработка нажатия кнопки "Дата заезда"
export const getActionDateStart = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.dateStart, async (ctx) => {
    try {
      // callback_query.data из нажатой инлайн-кнопки
      const dateStart = ctx.match[0].replace('dateStart_', '');

      // проверка инициализации сессии
      if (ctx.session && ctx.session.start) {
        // сохранение даты старта в сессию
        ctx.session.dateStart = dateStart;
        // изменение кнопки (добавление отметки о заполнении)

        ctx.session.start.inline_keyboard[0][0].text = 'Дата заезда ✔️';
      } else {
        // отправка сообщения о необходимости перезапуска сессии
        await sendRestart(ctx);

        return;
      }

      // возврат в главное меню
      await mainMenu(ctx, { type: 'creating' });
    } catch (error) {
      errorHandler(error);
    }
  });
};
