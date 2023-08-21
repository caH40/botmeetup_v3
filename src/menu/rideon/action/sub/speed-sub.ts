import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';
import { mainMenu } from '../../../../modules/mainmenu.js';
import { regular } from '../../../../common/constants.js';
import { sendRestart } from '../../../../telegram/reply/restart.js';

// обработка нажатия кнопки "Средняя скорость заезда"
export const getActionSpeeds = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.speedStart, async (ctx) => {
    // callback_query.data из нажатой инлайн-кнопки
    const speed = ctx.match[0].replace('speedStart_', '');

    // проверка инициализации сессии
    if (ctx.session && ctx.session.start) {
      // сохранение средней скорости заезда в сессию
      ctx.session.speed = speed;
      // изменение кнопки (добавление отметки о заполнении)
      ctx.session.start.inline_keyboard[2][1].text = 'Средняя скорость ✔️';
    } else {
      // отправка сообщения о необходимости перезапуска сессии
      await sendRestart(ctx);

      return;
    }

    // возврат в главное меню
    await mainMenu(ctx, { type: 'creating' });
  });
};
