import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

import { ILocations } from '../../../../../interface/model/locations.interface.js';

// формирование клавиатуры с найденными городами при запросе
export function keyboardLocationWeather(
  locations: ILocations[],
  extendData: string
): Markup.Markup<InlineKeyboardMarkup> {
  const keyboardLocations = [];

  // формирование меню с двумя столбцами
  for (let i = 0; i < locations.length; i += 2) {
    // если количество кнопок нечётное, то добавлять последнюю кнопку со звездочками ***
    // чтобы не было пустого места в меню
    if (!locations[i + 1]) {
      locations[i + 1] = { name: '', lon: 0, lat: 0 };
      locations[i + 1].name = '***';
    }
    // формирование кнопок
    keyboardLocations.push([
      Markup.button.callback(locations[i].name, extendData + locations[i].name),
      Markup.button.callback(locations[i + 1].name, extendData + locations[i + 1].name),
    ]);
  }

  return Markup.inlineKeyboard(keyboardLocations);
}
