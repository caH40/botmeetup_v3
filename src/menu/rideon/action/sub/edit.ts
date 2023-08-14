import { Telegraf } from 'telegraf';

import { IBotContext } from '../../../../interface/context.interface.js';
import { mainMenu } from '../../../../modules/mainmenu.js';

// обработка нажатия кнопки "Редактировать" в меню "Сводные данные о заезде"
// возврат в главное меню, для продолжения ввода или редактирования данных
export const getActionEditFromPreview = (bot: Telegraf<IBotContext>): void => {
  bot.action('backToMain', async (ctx) => await mainMenu(ctx, true));
};
