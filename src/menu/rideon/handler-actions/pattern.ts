import { errorHandler } from '../../../errors/error.js';
import { IBotContext } from '../../../interface/context.interface.js';
import { Post } from '../../../model/Post.js';
import { getKeyboardBack } from '../keyboard/back.js';
import { getKeyboardPattern } from '../keyboard/pattern.js';

export const handlerPattern = async (ctx: IBotContext): Promise<void> => {
  if (!ctx.callbackQuery) {
    return;
  }

  const userId = ctx.callbackQuery.from.id;
  const postsDB = await Post.find({ userId, isPattern: true });

  if (postsDB.length == 0) {
    await ctx.editMessageText(
      'У вас нет ни одного сохраненного объявления о велозаезде.',
      getKeyboardBack('Вернутся в главное меню')
    );

    return;
  }

  await ctx
    .editMessageText('Выберите действие с сохраненными объявлениями. ', getKeyboardPattern())
    .catch((error) => errorHandler(error));
};
