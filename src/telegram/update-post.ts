import { CHANNEL_ID } from '../config/dotenv.js';
import { IMixContext } from '../interface/context.interface.js';
import { errorHandler } from '../errors/error.js';
import { formFinalPost } from '../modules/forms/form-final.js';
import { createPostDataFromDB } from '../utils/postdata-create.js';
import { IPost } from '../interface/model/post.interface.js';

export async function updatePostChannel(
  ctx: IMixContext,
  post: IPost,
  pollQuantity: number
): Promise<void> {
  const pollData = createPostDataFromDB(post, pollQuantity);
  const formPostString = formFinalPost(pollData);

  await ctx.telegram
    .editMessageCaption(CHANNEL_ID, post.messageId, 'привет!', formPostString, {
      parse_mode: 'HTML',
    })
    .catch((error) => errorHandler(error));
}
