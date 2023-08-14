import { posted } from '../common/posted.js';
import { IBotContext } from '../interface/context.interface.js';
import { Post } from '../model/Post.js';
import { formFinalPost } from './form-final.js';

// публикация объявления в телеграм и сохранение в БД
export const publishForm = async (ctx: IBotContext) => {
  const finalPost = formFinalPost(ctx);
  // если объявление уже есть в базе данных
  // const _idPost = ctx.session._id;
  // if (_idPost) {
  //   const postDB = await Post.findOneAndUpdate(
  //     { _id: _idPost },
  //     {
  //       $set: {
  //         date: ctx.session.dateStart,
  //         time: ctx.session.time,
  //         locationStart: ctx.session.locationStart,
  //         locationWeather: ctx.session.locationWeather,
  //         distance: ctx.session.distance,
  //         speed: ctx.session.speed,
  //         photoId: ctx.session.photoId,
  //         description: ctx.session.description,
  //       },
  //     },
  //     { returnDocument: 'after' }
  //   );
  //   await updatePhoto(ctx, postDB).catch(error => console.log(error));
  //   await weatherFromApi(ctx);
  //   await weatherUpdate(ctx);
  //   return;
  // }

  const { channelId, channelName, pictureId } = ctx.session;

  const messageChannel = await ctx.telegram.sendPhoto(channelId, pictureId, {
    caption: finalPost,
    parse_mode: 'HTML',
  });

  // сообщение о размещении объявления на канале

  const postMessage = posted(channelName);
  await ctx.reply(postMessage);
  //номер сообщения в канале
  const messageId = messageChannel.message_id;

  const post = new Post({
    date: ctx.session.dateStart,
    time: ctx.session.time,
    leader: ctx.session.leader,
    userId: ctx.session.userId,
    locationStart: ctx.session.location,
    locationWeather: ctx.session.locationWeather,
    distance: ctx.session.distance,
    speed: ctx.session.speed,
    photoId: ctx.session.pictureId,
    description: ctx.session.description,
    messageId,
    isLastUpdated: false,
  });

  await post.save();
  // await weatherFromApi(ctx);
  // await weatherUpdate(ctx);
};
