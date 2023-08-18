import { InlineKeyboardMarkup } from 'telegraf/types';

import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';
import { keyboardMain } from '../menu/rideon/keyboard/main.js';
import { deleteMyMessage } from './message-delete.js';
import { IMainMenuExtra } from '../interface/mainmenu.interface.js';

export const mainMenu = async (ctx: IBotContext, { type, isNew }: IMainMenuExtra) => {
  await deleteMyMessage(ctx);
  // если сессия инициализирована, то брать меню из сессии
  // если нет, то генерировать новое меню
  const getKeyboard = (): InlineKeyboardMarkup => {
    if (ctx.session && ctx.session.start) {
      return ctx.session.start;
    } else {
      //FIXME: !!проверить когда это срабатывает
      return keyboardMain();
    }
  };

  const title =
    type === 'creating' ? 'Выберите блок заполнения' : 'Выберите блок для редактирования';

  if (isNew) {
    // удаление и отправка нового меню в тех случаях когда нельзя отредактировать прошлое сообщение
    await ctx.deleteMessage().catch((error) => errorHandler(error));
    await ctx
      .reply(title, {
        reply_markup: getKeyboard(),
      })
      .catch((error) => errorHandler(error));
  } else {
    await ctx
      .editMessageText(title, {
        reply_markup: getKeyboard(),
      })
      .catch((error) => errorHandler(error));
  }
};
