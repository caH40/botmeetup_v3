import { errorHandler } from '../errors/error.js';
import { IBotContext } from '../interface/context.interface.js';
import { keyboardMain } from '../menu/rideon/keyboard/main.js';

export async function mainMenu(ctx: IBotContext) {
  await ctx
    .editMessageText('Выберите блок заполнения', {
      reply_markup: keyboardMain,
    })
    .catch((error) => errorHandler(error));
}
