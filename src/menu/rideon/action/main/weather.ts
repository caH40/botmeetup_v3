import { Telegraf } from 'telegraf';
import { IBotContext } from '../../../../interface/context.interface.js';

// обработка нажатия кнопки "Дата заезда" в главном меню
export const getActionWeather = (bot: Telegraf<IBotContext>): void => {
  bot.action('meetWeather', async (ctx) => await ctx.scene.enter('weather'));
};
