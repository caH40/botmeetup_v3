import { Types } from 'mongoose';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

// кнопка возврата в главное меню с разными подписями "text"
export const getKeyboardEdit = (
  postId: Types.ObjectId,
  index: number,
  postLastIndex: number
): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboard = [
    [
      Markup.button.callback(`Редактировать №${index + 1}`, `postId_editPost_${postId}`),
      Markup.button.callback(`Удалить №${index + 1}`, `postId_delPost_${postId}`),
    ],
  ];

  // в последний пост добавляется кнопка возврата в главное меню
  if (postLastIndex === index) {
    keyboard.push([Markup.button.callback('Выход из редактирования', 'backToMain')]);
  }
  return Markup.inlineKeyboard(keyboard);
};
