import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';
import { mainMenu } from '../../../../modules/mainmenu.js';
import { regular } from '../../../../common/constants.js';
import { sendRestart } from '../../../../reply/restart.js';

// обработка нажатия кнопки "Дистанция заезда"
export const getActionDistances = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.distanceStart, async (ctx) => {
    // callback_query.data из нажатой инлайн-кнопки
    const distance = ctx.match[0].replace('distanceStart_', '');

    // проверка инициализации сессии
    if (ctx.session) {
      // сохранение дистанции заезда в сессию
      ctx.session.distance = distance;
      // изменение кнопки (добавление отметки о заполнении)
      ctx.session.start.inline_keyboard[2][0].text = 'Дистанция, км ✔️';
    } else {
      // отправка сообщения о необходимости перезапуска сессии
      await sendRestart(ctx);

      return;
    }

    // возврат в главное меню
    await mainMenu(ctx);
  });
};
