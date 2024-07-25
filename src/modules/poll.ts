import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';
import { Poll } from '../model/Poll.js';
import { Post } from '../model/Post.js';
import { missBikeRide } from '../telegram/message/miss.js';
import { updatePostChannel } from '../telegram/update-post.js';
import { getPollUsers } from '../utils/poll-users.js';

// обработчик update pollAnswer, действия при голосовании
export async function pollHandler(ctx: IBotContext) {
  try {
    // выход, если нет данных по голосованию
    if (!ctx.pollAnswer) {
      return;
    }

    const pollId = ctx.pollAnswer.poll_id;
    // получение документа с голосованием по poll_id
    const pollDB = await Poll.findOne({ 'poll.id': pollId });
    // выход, если не найдено текущее голосование, начет изменять нечего
    if (!pollDB) {
      return;
    }

    // получение данных о велозаезде из БД
    const responsePost = await Post.findOne({ _id: pollDB.postId });
    // выход, если не найден соответствующий документ в БД
    if (!responsePost) {
      return;
    }
    const { isLastUpdated, messageIdGroup } = responsePost;

    // если был старт, отправляется соответствующее сообщение
    if (isLastUpdated) {
      const firstName = ctx.pollAnswer.user!.first_name;
      await missBikeRide(ctx, messageIdGroup, firstName);

      return;
    }

    // формирования массива pollUsers пользователей, проголосовавших "ЗА"
    const userId = ctx.pollAnswer.user!.id;
    const username = ctx.pollAnswer.user!.username;
    const pollOption = ctx.pollAnswer.option_ids;
    const pollUsers = getPollUsers(pollDB.pollUsers, { userId, username }, pollOption);

    const pollQuantity = pollUsers.length;
    // обновление данных в БД по голосованию
    await Poll.findOneAndUpdate({ 'poll.id': pollId }, { $set: { pollUsers, pollQuantity } });

    // обновление поста, в дискуссионной группе которой проголосовали
    await updatePostChannel(ctx, responsePost, pollQuantity);
  } catch (error) {
    errorHandler(error);
  }
}
