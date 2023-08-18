import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../interface/context.interface.js';
import { publishFormEdited } from '../../../modules/form-publish-edited.js';

// обработка нажатия кнопки "Дистанция" в главном меню
export const getActionPublicationFromEdit = (bot: Telegraf<IBotContext>): void => {
  bot.action('publicationFromEdit', async (ctx) => {
    // удаление меню
    await ctx.deleteMessage();

    // публикация объявления в телеграм и сохранение в БД
    await publishFormEdited(ctx);
  });
};
