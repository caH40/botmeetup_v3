import { Types } from 'mongoose';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

// меню работы с сохраненными шаблонами объявлений
export const getKeyboardPatternList = (
  postId: Types.ObjectId,
  index: number,
  action: string,
  text: string,
  postLastIndex: number
): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboard = [
    [Markup.button.callback(`${text}${index + 1}`, `postId_${action}${postId}`)],
  ];

  // в последний пост добавляется кнопка возврата в главное меню
  if (postLastIndex === index) {
    keyboard.push([Markup.button.callback('Вернутся в главное меню', 'backToMain')]);
  }
  return Markup.inlineKeyboard(keyboard);
};
