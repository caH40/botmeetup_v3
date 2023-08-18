import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../interface/context.interface.js';
import { createPostData } from '../../../utils/postdata-create.js';
import { formFinalPost } from '../../../modules/forms/form-final.js';
import { getKeyboardSummary } from '../../rideon/keyboard/summary.js';

// обработка нажатия кнопки "Редактирование объявления"
export const getActionSummaryForEdit = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetSummaryFromEdit', async (ctx) => {
    // удаление меню, что бы после возврата из сессии сделать новое
    await ctx.deleteMessage();

    const postData = createPostData(ctx);

    // в зависимости от наличия фотографии вызываются разные методы
    if (ctx.session.pictureId) {
      await ctx.replyWithPhoto(ctx.session.pictureId, {
        caption: formFinalPost(postData),
        parse_mode: 'HTML',
        ...getKeyboardSummary(true),
      });
    } else {
      await ctx.replyWithHTML(formFinalPost(postData), {
        ...getKeyboardSummary(true),
      });
    }
  });
};
