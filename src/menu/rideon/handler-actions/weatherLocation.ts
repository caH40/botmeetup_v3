import { temporaryStorage } from '../../../botmeetup_v3.js';
import { getLocationName } from '../../../utils/text.js';

import { SessionData } from '../../../interface/session.interface.js';

export function saveWeatherStartLocationToSession(
  chatId: number,
  session: SessionData | undefined
) {
  const locationWeather = temporaryStorage.weather.get(chatId);

  const locationName = getLocationName(locationWeather?.address);

  // Сохранение в сессию данных места старта.
  if (session?.start && locationName && locationWeather?.coords) {
    // сохранение дистанции заезда в сессию
    session.weatherLocation = { name: locationName, coords: locationWeather.coords };

    // изменение кнопки (добавление отметки о заполнении)
    session.start.inline_keyboard[1][1].text = 'Погода ✔️';
  }
}
