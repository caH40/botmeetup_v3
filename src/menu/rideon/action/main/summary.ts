import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';
import { formFinalPost } from '../../../../modules/forms/form-final.js';
import { getKeyboardSummary } from '../../keyboard/summary.js';
import { createPostData } from '../../../../utils/postdata-create.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionSummary = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetSummary', async (ctx) => {
    // удаление меню, что бы после возврата из сессии сделать новое
    await ctx.deleteMessage();

    const postData = createPostData(ctx);

    // в зависимости от наличия фотографии вызываются разные методы
    if (ctx.session.pictureId) {
      await ctx.replyWithPhoto(ctx.session.pictureId, {
        caption: formFinalPost(ctx, postData),
        parse_mode: 'HTML',
        ...getKeyboardSummary(),
      });
    } else {
      await ctx.replyWithHTML(formFinalPost(ctx, postData), {
        ...getKeyboardSummary(),
      });
    }
  });
};
