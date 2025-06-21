import { IBotContext } from '../interface/context.interface.js';
import { Post } from '../model/Post.js';
import { sendPosted } from '../telegram/reply/posted.js';
import { createPostData } from '../utils/postdata-create.js';
import { getWeatherForActualPosts } from '../weather/weather-for-posts.js';
import { formFinalPost } from './forms/form-final.js';

/**
 * Публикация объявления в телеграм и сохранение в БД.
 */
export const publishForm = async (ctx: IBotContext) => {
  const postData = createPostData(ctx);
  const finalPost = formFinalPost(postData);

  const { channelId, channelName, pictureId } = ctx.session;

  // публикация поста в канале channelName
  const messageChannel = await ctx.telegram.sendPhoto(channelId, pictureId, {
    caption: finalPost,
    parse_mode: 'HTML',
  });

  // сообщение об успешном размещении объявления в канале channelName
  await sendPosted(ctx, channelName);

  //номер сообщения в канале
  const messageId = messageChannel.message_id;

  const post = new Post({
    date: ctx.session.dateStart,
    time: ctx.session.time,
    leader: ctx.session.leader,
    userId: ctx.session.userId,
    startLocation: ctx.session.startLocation,
    weatherLocation: ctx.session.weatherLocation,
    distance: ctx.session.distance,
    speed: ctx.session.speed,
    photoId: ctx.session.pictureId,
    description: ctx.session.description,
    messageId,
    isLastUpdated: false,
  });

  await post.save();

  // await getWeatherForActualPosts();
};
