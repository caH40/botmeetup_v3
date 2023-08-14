import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

// кнопка возврата в главное меню с разными подписями "text"
export const getKeyboardBack = (text: string): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboard = [Markup.button.callback(text, 'backToMain')];
  return Markup.inlineKeyboard(keyboard);
};
