import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

// формирования массива с временем старта
const timesArr: string[] = [];

// час с которого начинается формирование времени старта
const hourStart = 5;
// час до которого заканчивается формирование времени старта
const hourEnd = 20;
// минута в каждом часе, когда происходит старт
const minutes = 30;
// количество кнопок с временем старта.
// рассчитывается как (hourEnd-hourStart)*2+1 (старт в 0 и 30 минут каждого часа)
const buttonsQuantity = 31;

for (let h = hourStart; h < hourEnd; h++) {
  for (let m = 0; m < buttonsQuantity; m = m + minutes) {
    if (m === 0) {
      timesArr.push(`${h}:${m}0`);
    } else {
      timesArr.push(`${h}:${m}`);
    }
  }
}

// формирования массива строк с временем старта заезда
export const getKeyboardTimes = (): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboard = [];
  for (let i = 0; i < timesArr.length; i = i + 6) {
    keyboard.push([
      Markup.button.callback(timesArr[i], `timeStart_${timesArr[i]}`),
      Markup.button.callback(timesArr[i + 1], `timeStart_${timesArr[i + 1]}`),
      Markup.button.callback(timesArr[i + 2], `timeStart_${timesArr[i + 2]}`),
      Markup.button.callback(timesArr[i + 3], `timeStart_${timesArr[i + 3]}`),
      Markup.button.callback(timesArr[i + 4], `timeStart_${timesArr[i + 4]}`),
      Markup.button.callback(timesArr[i + 5], `timeStart_${timesArr[i + 5]}`),
    ]);
  }
  return Markup.inlineKeyboard(keyboard);
};
