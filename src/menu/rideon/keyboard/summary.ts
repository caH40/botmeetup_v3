import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

// сводные данных по заезду
export const getKeyboardSummary = (): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboard = [
    [
      Markup.button.callback('Опубликовать', 'publication'),
      Markup.button.callback('Редактировать', 'backToMain'),
    ],
  ];
  return Markup.inlineKeyboard(keyboard);
};
