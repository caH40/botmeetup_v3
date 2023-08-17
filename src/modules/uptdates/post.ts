import { IMixContext } from '../../interface/context.interface.js';
import { Poll } from '../../model/Poll.js';
import { Post } from '../../model/Post.js';
import { updatePostChannel } from '../../telegram/update-post.js';

// обновление всех актуальных объявлений в канале
export const updatePosts = async (bot: IMixContext): Promise<void> => {
  const actualPostsDB = await Post.find({ isLastUpdated: false });

  for (const actualPost of actualPostsDB) {
    const pollDB = await Poll.findOne({ postId: actualPost._id });

    const pollQuantity = pollDB ? pollDB.pollQuantity : 0;

    await updatePostChannel(bot, actualPost, pollQuantity);
  }
};
