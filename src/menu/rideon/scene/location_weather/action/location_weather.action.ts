import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../../interface/context.interface.js';
import { mainMenu } from '../../../../../modules/mainmenu.js';
import { sendRestart } from '../../../../../telegram/reply/restart.js';
import { regular } from '../../../../../common/constants.js';

// обработка нажатия кнопки выбор места мониторинга погоды
export const getActionLocationWeatherStart = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.locationWeatherStart, async (ctx) => {
    // callback_query.data из нажатой инлайн-кнопки
    const locationWeather = ctx.match[0].replace('weather_', '');

    // проверка инициализации сессии
    if (ctx.session && ctx.session.start) {
      // сохранение погоды в сессию
      ctx.session.locationWeather = locationWeather;
      // изменение кнопки (добавление отметки о заполнении)
      ctx.session.start.inline_keyboard[1][1].text = 'Погода ✔️';
    } else {
      // отправка сообщения о необходимости перезапуска сессии
      await sendRestart(ctx);

      return;
    }

    // возврат в главное меню
    await mainMenu(ctx, { type: 'creating' });
  });
};
