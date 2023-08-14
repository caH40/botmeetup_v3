import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';

export function formFinalPost(ctx: IBotContext) {
  try {
    if (ctx.callbackQuery) {
      const userName = ctx.callbackQuery.from.username;
      const userId = ctx.callbackQuery.from.id;

      ctx.session.leader = '@' + userName;
      ctx.session.userId = userId;
    }

    return `${ctx.session.description ?? 'Детали заезда:'}\n<b>Место старта:</b> ${
      ctx.session.location ?? '---'
    };\n<b>Дата заезда:</b> ${ctx.session.dateStart ?? '---'};\n<b>Время старта:</b> ${
      ctx.session.time ?? '---'
    };\n<b>Дистанция:</b> ${ctx.session.distance ?? '---'};\n<b>Tемп:</b> ${
      ctx.session.speed ?? '---'
    };\n<b>Погода (${ctx.session.locationWeather ?? '---'}):</b>\n<b>Организатор заезда:</b> ${
      ctx.session.leader
    }`;
  } catch (error) {
    errorHandler(error);
    return 'Ошибка при формировании объявления';
  }
}
