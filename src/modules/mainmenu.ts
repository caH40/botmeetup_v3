import { InlineKeyboardMarkup } from 'telegraf/types';

import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';
import { keyboardMain } from '../menu/rideon/keyboard/main.js';

export const mainMenu = async (ctx: IBotContext) => {
  // если сессия инициализирована, то брать меню из сессии
  // если нет, то генерировать новое меню
  const getKeyboard = (): InlineKeyboardMarkup => {
    if (ctx.session) {
      return ctx.session.start;
    } else {
      return keyboardMain();
    }
  };

  await ctx
    .editMessageText('Выберите блок заполнения', {
      reply_markup: getKeyboard(),
    })
    .catch((error) => errorHandler(error));
};
