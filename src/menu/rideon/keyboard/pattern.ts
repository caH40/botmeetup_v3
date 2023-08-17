import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

// меню работы с сохраненными шаблонами объявлений
export const getKeyboardPattern = (): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboard = [
    [
      Markup.button.callback('Выбрать объявление', 'meetPatternGet'),
      Markup.button.callback('Удалить объявление', 'meetPatternDel'),
    ],
    [Markup.button.callback('Вернутся в главное меню', 'backToMain')],
  ];
  return Markup.inlineKeyboard(keyboard);
};
