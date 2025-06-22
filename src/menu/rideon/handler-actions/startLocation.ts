import { temporaryStorage } from '../../../botmeetup_v3.js';
import { getLocationName } from '../../../utils/text.js';

import { SessionData } from '../../../interface/session.interface.js';

export function saveStartLocationToSession(chatId: number, session: SessionData | undefined) {
  const locationStart = temporaryStorage.start.get(chatId);

  const locationName = getLocationName(locationStart?.address);

  // Сохранение в сессию данных места старта.
  if (session?.start && locationName && locationStart?.coords) {
    // сохранение дистанции заезда в сессию
    session.startLocation = { name: locationName, coords: locationStart.coords };

    // изменение кнопки (добавление отметки о заполнении)
    session.start.inline_keyboard[1][0].text = 'Место старта ✔️';
  }
}
