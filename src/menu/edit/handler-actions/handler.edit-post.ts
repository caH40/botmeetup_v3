import { Post } from '../../../model/Post.js';
import { mainMenu } from '../../../modules/mainmenu.js';

import { IBotContext } from '../../../interface/context.interface.js';
import { keyboardMain } from '../../rideon/keyboard/main.js';

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
      ctx.session.start = keyboardMain();

      ctx.session.start.inline_keyboard[0][0].text = 'Дата заезда ✔️';
      ctx.session.start.inline_keyboard[0][1].text = 'Время старта ✔️';
      ctx.session.start.inline_keyboard[1][0].text = 'Место старта ✔️';
      ctx.session.start.inline_keyboard[1][1].text = 'Погода ✔️';
      ctx.session.start.inline_keyboard[2][0].text = 'Дистанция, км ✔️';
      ctx.session.start.inline_keyboard[2][1].text = 'Средняя скорость ✔️';
      ctx.session.start.inline_keyboard[3][0].text = 'Картинка ✔️';
      ctx.session.start.inline_keyboard[3][1].text = 'Описание ✔️';
    }
  }
  // необходимо изменить главное меню, чтобы отредактированное объявление изменяло старое, а не создавало новое
  await mainMenu(ctx, true);
};
