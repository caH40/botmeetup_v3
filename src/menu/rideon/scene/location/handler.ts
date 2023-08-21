import { IBotContext } from '../../../../interface/context.interface.js';
import { ILocations } from '../../../../interface/model/locations.interface.js';
import { errorHandler } from '../../../../errors/error.js';
import { City } from '../../../../model/City.js';
import { keyboardLocation } from './keyboard/location.keyboard.js';
import { sceneLocationText as txt } from './text.js';
import { sendReply } from '../../../../telegram/reply/reply.js';

// обработка введенного текста в сцене Location
export async function handlerSceneLocation(ctx: IBotContext, text: string) {
  try {
    if (ctx.session && ctx.session.start) {
      // обнуление места старта (location) в сессии
      ctx.session.location = '---';
      ctx.session.start.inline_keyboard[1][0].text = 'Место старта';
    }

    // получение массива с городами, соответствующих введенной пользователем строки
    const citiesDB: ILocations[] = await City.find(
      { name: { $regex: text, $options: 'i' } },
      { _id: false, __v: false }
    );

    // если найденных городов больше 20, то выполнить более узкий запрос
    const citiesMax = 20;
    if (citiesDB.length > citiesMax) {
      return await sendReply(ctx, txt.tooMachCities);
    }

    if (citiesDB.length === 0) {
      return await sendReply(ctx, txt.notFound);
    }
    // отправка меню с найденными городами
    ctx.reply(txt.chooseCity, {
      ...keyboardLocation(citiesDB, 'mainLocation_'),
    });
  } catch (error) {
    errorHandler(error);
  }
}
