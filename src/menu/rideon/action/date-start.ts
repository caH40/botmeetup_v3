import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../interface/context.interface.js';
import { mainMenu } from '../../../modules/mainmenu.js';
import { regular } from '../../../common/constants.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionDateStart = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.dateStart, async (ctx) => {
    // callback_query.data из нажатой инлайн-кнопки
    const dateStart = ctx.match[0];
    // сохранение даты старта в сессию
    ctx.session!.dateStart = dateStart;
    // изменение кнопки (добавление отметки о заполнении)
    ctx.session!.start.inline_keyboard[0][0].text = 'Дата заезда ✔️';
    // возврат в главное меню
    await mainMenu(ctx);
  });
};
