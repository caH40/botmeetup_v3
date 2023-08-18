import { Post } from '../../../model/Post.js';
import { mainMenu } from '../../../modules/mainmenu.js';

import { IBotContext } from '../../../interface/context.interface.js';
import { keyboardMainForEdit } from '../../rideon/keyboard/main-edit.js';

// обработчик нажатия кнопки "Редактировать №(номер поста)" в меню команды /edit
export const handlerActionEditPost = async (
  ctx: IBotContext,
  cbqData: string
): Promise<void> => {
  const postId = cbqData.slice(16);

  const postDB = await Post.findOne({ _id: postId, isLastUpdated: false });

  if (postDB) {
    ctx.session.postId = postId;
    ctx.session.time = postDB.time;
    ctx.session.dateStart = postDB.date;
    ctx.session.leader = postDB.leader;
    ctx.session.userId = +postDB.userId;
    ctx.session.location = postDB.locationStart;
    ctx.session.locationWeather = postDB.locationWeather;
    ctx.session.distance = postDB.distance;
    ctx.session.speed = postDB.speed;
    ctx.session.pictureId = postDB.photoId;
    ctx.session.description = postDB.description;
    ctx.session.userId = +postDB.userId;
    ctx.session.leader = postDB.leader;

    // проставление галок на кнопках
    if (ctx.session) {
      // инициализация клавиатуры меню
      ctx.session.start = keyboardMainForEdit();
    }
  }
  // необходимо изменить главное меню, чтобы отредактированное объявление изменяло старое, а не создавало новое
  await mainMenu(ctx, { type: 'editing', isNew: true });
};
