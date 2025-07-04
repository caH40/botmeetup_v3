import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

// сводные данных по заезду
export const getKeyboardSummary = (formEdit?: boolean): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboardFromCreate = [
    [
      Markup.button.callback('Опубликовать', 'publication'),
      Markup.button.callback('Редактировать', 'backToMain'),
    ],
  ];

  const keyboardFromEdit = [
    [
      Markup.button.callback('Сохранить изменения', 'publicationFromEdit'),
      Markup.button.callback('Продолжить редактирование', 'backToMain'),
    ],
  ];
  const keyboard = formEdit ? keyboardFromEdit : keyboardFromCreate;
  return Markup.inlineKeyboard(keyboard);
};
