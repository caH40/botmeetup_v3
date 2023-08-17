import { IBotContext } from '../../../interface/context.interface.js';

import { Post } from '../../../model/Post.js';
import { mainMenu } from '../../../modules/mainmenu.js';

export const handlerPatternDelOne = async (
  ctx: IBotContext & {
    match: RegExpExecArray;
  }
): Promise<void> => {
  // callback_query.data из нажатой инлайн-кнопки
  const postId = ctx.match[0].slice(11);

  await Post.findOneAndUpdate({ _id: postId }, { $set: { isPattern: false } });
  await mainMenu(ctx, true);
};
