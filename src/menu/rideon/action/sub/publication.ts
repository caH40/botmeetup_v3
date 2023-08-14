import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';
import { publishForm } from '../../../../modules/form-publish.js';
import { formFinalPost } from '../../../../modules/form-final.js';
import { getKeyboardBack } from '../../keyboard/back.js';

// обработка нажатия кнопки "Дистанция" в главном меню
export const getActionPublication = (bot: Telegraf<IBotContext>): void => {
  bot.action('publication', async (ctx) => {
    //проверка на заполненность всех полей объявления, краткое описание заезда может не заполняться
    const finalPost = formFinalPost(ctx);
    if (finalPost.includes('---') || !ctx.session.pictureId) {
      await ctx.deleteMessage();
      await ctx.reply('Не все поля заполнены!!!', getKeyboardBack('Продолжить ввод данных'));
      return;
    }
    // удаление меню
    await ctx.deleteMessage();

    // публикация объявления в телеграм и сохранение в БД
    await publishForm(ctx);
  });
};
