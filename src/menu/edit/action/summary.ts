import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../interface/context.interface.js';
import { createPostData } from '../../../utils/postdata-create.js';
import { formFinalPost } from '../../../modules/forms/form-final.js';
import { getKeyboardSummary } from '../../rideon/keyboard/summary.js';
import { saveStartLocationToSession } from '../../rideon/handler-actions/startLocation.js';
import { saveWeatherStartLocationToSession } from '../../rideon/handler-actions/weatherLocation.js';

// обработка нажатия кнопки "Редактирование объявления"
export const getActionSummaryForEdit = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetSummaryFromEdit', async (ctx) => {
    const chatId = ctx.chat?.id;

    if (!chatId) {
      throw new Error('Не получен chatId с ботом!');
    }

    // Блок формирования данных места старта и места погоды и сохранение в сессию.
    saveStartLocationToSession(chatId, ctx.session);
    saveWeatherStartLocationToSession(chatId, ctx.session);

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
