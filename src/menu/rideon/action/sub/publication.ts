import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';
import { publishForm } from '../../../../modules/form-publish.js';
import { formFinalPost } from '../../../../modules/forms/form-final.js';
import { getKeyboardBack } from '../../keyboard/back.js';
import { createPostData } from '../../../../utils/postdata-create.js';

// обработка нажатия кнопки "Дистанция" в главном меню
export const getActionPublication = (bot: Telegraf<IBotContext>): void => {
  bot.action('publication', async (ctx) => {
    //проверка на заполненность всех полей объявления, краткое описание заезда может не заполняться
    const postData = createPostData(ctx);

    const finalPost = formFinalPost(postData);
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
