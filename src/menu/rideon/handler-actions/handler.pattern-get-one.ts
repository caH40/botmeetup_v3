import { IBotContext } from '../../../interface/context.interface.js';

import { Post } from '../../../model/Post.js';
import { mainMenu } from '../../../modules/mainmenu.js';

export const handlerPatternGetOne = async (
  ctx: IBotContext & {
    match: RegExpExecArray;
  }
): Promise<void> => {
  // callback_query.data из нажатой инлайн-кнопки
  const postId = ctx.match[0].slice(11);

  const postDB = await Post.findOne({ _id: postId });

  if (postDB) {
    ctx.session.time = postDB.time;
    ctx.session.leader = postDB.leader;
    ctx.session.userId = +postDB.userId;
    ctx.session.location = postDB.locationStart;
    ctx.session.locationWeather = postDB.locationWeather;
    ctx.session.distance = postDB.distance;
    ctx.session.speed = postDB.speed;
    ctx.session.pictureId = postDB.photoId;
    ctx.session.description = postDB.description;

    // обнуление даты старта, так как дату необходимо поменять на актуальную
    ctx.session.dateStart = '---';
    // проставление галок на кнопках
    if (ctx.session && ctx.session.start) {
      ctx.session.start.inline_keyboard[0][1].text = 'Время старта ✔️';
      ctx.session.start.inline_keyboard[1][0].text = 'Место старта ✔️';
      ctx.session.start.inline_keyboard[1][1].text = 'Погода ✔️';
      ctx.session.start.inline_keyboard[2][0].text = 'Дистанция, км ✔️';
      ctx.session.start.inline_keyboard[2][1].text = 'Средняя скорость ✔️';
      ctx.session.start.inline_keyboard[3][0].text = 'Картинка ✔️';
      ctx.session.start.inline_keyboard[3][1].text = 'Описание ✔️';
    }
  }

  await mainMenu(ctx, { type: 'creating', isNew: true });
};
