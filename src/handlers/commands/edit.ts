import { initSession } from '../../modules/session.js';

import { IBotContext } from '../../interface/context.interface.js';
import { getKeyboardEdit } from '../../menu/rideon/keyboard/edit-post.js';
import { formPattern } from '../../modules/forms/pattern.js';
import { Post } from '../../model/Post.js';

export const handlerCommandEdit = async (ctx: IBotContext): Promise<void> => {
  await initSession(ctx);
  const userId = ctx.session.userId;

  //сделать проверку
  const postsDB = await Post.find({ userId, isLastUpdated: false });

  if (postsDB.length == 0) {
    await ctx.reply('У вас нет объявлений для редактирования/удаления!');
  }

  const postLastIndex = postsDB.length - 1;

  for (let index = 0; index < postsDB.length; index++) {
    const keyboard = getKeyboardEdit(postsDB[index]._id, index, postLastIndex);

    const response = await ctx.reply(formPattern(postsDB[index], index), {
      parse_mode: 'HTML',
      ...keyboard,
    });

    ctx.session.messageDel.push(response.message_id);
  }
};
