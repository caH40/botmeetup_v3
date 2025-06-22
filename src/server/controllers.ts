import { Request, Response } from 'express';

import { temporaryStorage } from '../botmeetup_v3.js'; // импортируем после его объявления

// types
import { TGeo } from '../interface/index.types.js';

export async function getWeatherGeo(req: Request, res: Response) {
  try {
    const { userId, data } = req.body as { userId: number; data: TGeo };
    const entity = req.params.entity as 'start' | 'weather';

    if (!userId || !data) {
      res.status(400).json({ message: 'Missing userId or data' });
      return;
    }

    // Сохранение данных в глобальную переменную.
    if (entity === 'start') {
      temporaryStorage.start.set(userId, data);
    } else if (entity === 'weather') {
      temporaryStorage.weather.set(userId, data);
    } else {
      throw new Error('Не получен entity для Geo места старта или погоды!');
    }

    res.send('Команда отправлена');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Ошибка:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}
