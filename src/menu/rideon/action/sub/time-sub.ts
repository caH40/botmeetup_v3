import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';
import { mainMenu } from '../../../../modules/mainmenu.js';
import { regular } from '../../../../common/constants.js';
import { sendRestart } from '../../../../reply/restart.js';

// обработка нажатия кнопки "Дата заезда"
export const getActionsTimes = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.timeStart, async (ctx) => {
    // callback_query.data из нажатой инлайн-кнопки
    const time = ctx.match[0].replace('timeStart_', '');

    // проверка инициализации сессии
    if (ctx.session) {
      // сохранение времени старта в сессию
      ctx.session.time = time;
      // изменение кнопки (добавление отметки о заполнении)
      ctx.session.start.inline_keyboard[0][1].text = 'Время старта ✔️';
    } else {
      // отправка сообщения о необходимости перезапуска сессии
      await sendRestart(ctx);

      return;
    }

    // возврат в главное меню
    await mainMenu(ctx);
  });
};
