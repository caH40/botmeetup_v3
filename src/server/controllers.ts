import { Request, Response } from 'express';
import { bot } from '../botmeetup_v3.js'; // импортируем после его объявления

export async function getWeatherGeo(req: Request, res: Response): Promise<void> {
  try {
    const { userId, data } = req.body;

    if (!userId || !data) {
      res.status(400).json({ message: 'Missing userId or data' });
      return;
    }

    const message = `🗺️ Координаты: ${data.coords.join(', ')}\n🏠 Адрес: ${
      data.address?.description
    }, ${data.address?.name}`;

    await bot.telegram.sendMessage(userId, message);
    res.send('Сообщение отправлено пользователю');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Ошибка отправки сообщения:', err);
    res.status(500).json({ message: 'Ошибка отправки сообщения' });
  }
}
