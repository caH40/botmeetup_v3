import { Telegraf } from 'telegraf';

import { regular } from '../../../common/constants.js';

import { IBotContext } from '../../../interface/context.interface.js';
import { handlerActionEditPost } from '../handler-actions/handler.edit-post.js';

// обработка нажатия кнопки "Редактирование объявления"
export const getActionEditPost = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.editPost, async (ctx) => await handlerActionEditPost(ctx, ctx.match[0]));
};
