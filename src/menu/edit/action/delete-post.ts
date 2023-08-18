import { Telegraf } from 'telegraf';

import { regular } from '../../../common/constants.js';

import { IBotContext } from '../../../interface/context.interface.js';
import { handlerActionDeletePost } from '../handler-actions/handler.delete-post.js';

// обработка нажатия кнопки "Удаление объявления"
export const getActionDeletePost = (bot: Telegraf<IBotContext>): void => {
  bot.action(regular.deletePost, async (ctx) => handlerActionDeletePost(ctx, ctx.match[0]));
};
