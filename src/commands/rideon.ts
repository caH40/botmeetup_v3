import { Telegraf } from 'telegraf';

import { IBotContext } from '../interface/context.interface.js';
import { rideonMainMenu } from '../menu/rideon/main.js';
import { initSession } from '../modules/session.js';
import { temporaryStorage } from '../botmeetup_v3.js';

// обработка команды /rideon
export const commandRideOn = (bot: Telegraf<IBotContext>): void => {
  bot.command('rideon', async (ctx: IBotContext) => {
    const userId = ctx.message?.from.id;

    if (!userId) {
      ctx.reply('Непредвиденная ошибка, не получен ваш userid!');
      return;
    }

    // Очистка хранилища по гео данным места старта и погоды для данного пользователя перед созданием нового объявления.
    temporaryStorage.start.delete(userId);
    temporaryStorage.weather.delete(userId);

    await initSession(ctx);
    await rideonMainMenu(ctx);
  });
};
