import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';
import { formFinalPost } from '../../../../modules/forms/form-final.js';
import { getKeyboardSummary } from '../../keyboard/summary.js';
import { createPostData } from '../../../../utils/postdata-create.js';
import { temporaryStorage } from '../../../../botmeetup_v3.js';
import { getLocationName } from '../../../../utils/text.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionSummary = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetSummary', async (ctx) => {
    const chatId = ctx.chat?.id;

    if (!chatId) {
      throw new Error('Не получен chatId с ботом!');
    }

    // Блок формирования данных места старта и места погоды и сохранение в сессию.
    const locationStart = temporaryStorage.start.get(chatId);

    const locationName = getLocationName(locationStart?.address);

    // Сохранение в сессию данных места старта.
    if (ctx.session?.start && locationName && locationStart?.coords) {
      // сохранение дистанции заезда в сессию
      ctx.session.locationName = locationName;
      ctx.session.locationCoords = locationStart.coords;
      // изменение кнопки (добавление отметки о заполнении)
      ctx.session.start.inline_keyboard[1][0].text = 'Место старта ✔️';
    }

    const locationWeather = temporaryStorage.weather.get(chatId);
    const locationWeatherName = getLocationName(locationWeather?.address);

    // Сохранение в сессию данных места погоды.
    if (ctx.session?.start && locationWeatherName && locationWeather?.coords) {
      // сохранение дистанции заезда в сессию
      ctx.session.locationWeatherName = locationWeatherName;
      ctx.session.locationWeatherCoords = locationWeather.coords;
      // изменение кнопки (добавление отметки о заполнении)
      ctx.session.start.inline_keyboard[1][1].text = 'Погода ✔️';
    }

    // удаление меню, что бы после возврата из сессии сделать новое
    await ctx.deleteMessage();

    const postData = createPostData(ctx);

    // в зависимости от наличия фотографии вызываются разные методы
    if (ctx.session.pictureId) {
      await ctx.replyWithPhoto(ctx.session.pictureId, {
        caption: formFinalPost(postData),
        parse_mode: 'HTML',
        ...getKeyboardSummary(),
      });
    } else {
      await ctx.replyWithHTML(formFinalPost(postData), {
        ...getKeyboardSummary(),
      });
    }
  });
};
