// главное меню rideon
import { IBotContext } from '../../interface/context.interface.js';
import { errorHandler } from '../../errors/error.js';
import { keyboardMain } from './keyboard/main.js';
import { sendReply } from '../../telegram/reply/reply.js';

export async function rideonMainMenu(ctx: IBotContext) {
  try {
    const messageId = ctx.message?.message_id;

    // проверка наличия username
    const userName = ctx.message?.from.username;
    if (!userName) {
      await sendReply(ctx, 'Пользователи с приватным аккаунтом не могут создавать объявления');
      return;
    }

    //при замене значения из модуля на keyboardMain, смешиваются ответы из разных сессий!!
    if (ctx.session) {
      ctx.session.messageDel = [];
      ctx.session.start = keyboardMain();
    }

    // отправка сообщения с блоком кнопок формирования заезда
    await ctx.reply('Выберите блок заполнения', { reply_markup: keyboardMain() });

    // удаление предыдущего сообщения (команды, которая вызвала блок кнопок)
    await ctx.deleteMessage(messageId).catch((error) => errorHandler(error));
  } catch (error) {
    errorHandler(error);
  }
}
