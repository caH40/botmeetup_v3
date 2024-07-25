import { CHANNEL_ID } from '../../../config/dotenv.js';
import { IBotContext } from '../../../interface/context.interface.js';
import { IPost } from '../../../interface/model/post.interface.js';
import { Poll } from '../../../model/Poll.js';
import { Post } from '../../../model/Post.js';

export const handlerActionDeletePost = async (
  ctx: IBotContext,
  cbqData: string
): Promise<void> => {
  const postId = cbqData.slice(15);

  // удаление объявления из БД
  const result = await Post.findOneAndDelete({
    _id: postId,
    isLastUpdated: false,
  });

  // Извлечение удаленного документа из результата
  // !!!Костыль для обхода глючной типизации.
  const postDB = (result ? result : null) as IPost | null;

  if (!postDB) {
    await ctx.reply('Объявление не найдено, или старт заезда уже был');
    return;
  }
  await ctx.reply('Объявление удалено с БД!');

  // удаление соответствующего голосования к объявлению о велозаезде
  await Poll.findOneAndDelete({ postId });

  // удаление объявления из канала Объявлений о велозаездах
  await ctx.telegram.deleteMessage(CHANNEL_ID, postDB.messageId);

  await ctx.reply('Объявление удалено с канала телеграм!');
};
