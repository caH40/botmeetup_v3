import { CHANNEL_ID } from '../config/dotenv.js';
import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';
import { Poll } from '../model/Poll.js';
import { Post } from '../model/Post.js';
import { sendPostedEdited } from '../telegram/reply/posted-edited.js';

import { createPostDataFromDB } from '../utils/postdata-create.js';
import { getWeatherForActualPosts } from '../weather/weather-for-posts.js';
import { formFinalPost } from './forms/form-final.js';

// изменение объявления в телеграм и обновление данных в БД
export const publishFormEdited = async (ctx: IBotContext) => {
  try {
    // id изменяемого объявления в БД

    const { postId } = ctx.session;

    const postDB = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $set: {
          date: ctx.session.dateStart,
          time: ctx.session.time,
          startLocation: ctx.session.startLocation,
          weatherLocation: ctx.session.weatherLocation,
          distance: ctx.session.distance,
          speed: ctx.session.speed,
          photoId: ctx.session.pictureId,
          description: ctx.session.description,
        },
      },
      { returnDocument: 'after' }
    );

    if (!postDB) {
      const error = new Error('Не найдено изменяемое объявление в БД');
      errorHandler(error);
      return;
    }

    // получение количества проголосовавших "ЗА" участив в заезде
    const { pollQuantity } = (await Poll.findOne({ postId }, { pollQuantity: true })) || {
      pollQuantity: 0,
    };
    // создание сообщения объявления для телеграм
    const postData = createPostDataFromDB(postDB, pollQuantity);
    const finalPost = formFinalPost(postData);

    // публикация поста в канале channelName
    const { pictureId, channelName } = ctx.session;
    const { messageId } = postDB;

    //изменение объявления в канале телеграм
    await ctx.telegram.editMessageMedia(CHANNEL_ID, messageId, 'string', {
      type: 'photo',
      media: pictureId,
      caption: finalPost,
      parse_mode: 'HTML',
    });

    await sendPostedEdited(ctx, channelName);

    await getWeatherForActualPosts();
    return;
  } catch (error) {
    errorHandler(error);
  }
};
