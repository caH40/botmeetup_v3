import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../../interface/context.interface.js';
import { mainMenu } from '../../../../../modules/mainmenu.js';
import { sendRestart } from '../../../../../reply/restart.js';
import { regular } from '../../../../../common/constants.js';

// обработка нажатия кнопки выбор города, где будет старт заезда
export const getActionLocationStart = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.locationStart, async (ctx) => {
    // callback_query.data из нажатой инлайн-кнопки
    const location = ctx.match[0].replace('mainLocation_', '');

    // проверка инициализации сессии
    if (ctx.session && ctx.session.start) {
      // сохранение дистанции заезда в сессию
      ctx.session.location = location;
      // изменение кнопки (добавление отметки о заполнении)
      ctx.session.start.inline_keyboard[1][0].text = 'Место старта ✔️';
    } else {
      // отправка сообщения о необходимости перезапуска сессии
      await sendRestart(ctx);

      return;
    }

    // возврат в главное меню
    await mainMenu(ctx);
  });
};
