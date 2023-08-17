import { IBotContext } from '../../../interface/context.interface.js';
import { Post } from '../../../model/Post.js';
import { formPattern } from '../../../modules/forms/pattern.js';
import { sendRestart } from '../../../reply/restart.js';
import { getKeyboardPatternList } from '../keyboard/pattern-list.js';

export const handlerPatternDel = async (ctx: IBotContext): Promise<void> => {
  if (!ctx.callbackQuery || !ctx.session.messageDel) {
    await sendRestart(ctx);
    return;
  }
  await ctx.deleteMessage();

  const userId = ctx.callbackQuery.from.id;
  const postsDB = await Post.find({ userId, isPattern: true });

  const postLastIndex = postsDB.length - 1;
  for (let index = 0; index < postsDB.length; index++) {
    // клавиатура
    const keyboard = getKeyboardPatternList(
      postsDB[index]._id,
      index,
      'del_',
      'Удалить объявление из шаблонов №',
      postLastIndex
    );

    const response = await ctx.reply(formPattern(postsDB[index], index), {
      parse_mode: 'HTML',
      ...keyboard,
    });

    // сохранение Id сообщений с постами для последующего удаления (очистки)
    ctx.session.messageDel.push(response.message_id);
  }
};
