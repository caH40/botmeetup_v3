import { IBotContext } from '../context/context.interface.js';
import { sendUnknownError } from './unknown-error.js';

function startMessage(channelName: string): string {
  const first = '\nСоздаю объявления для информационного канала ';
  const second = `<a href = "https://t.me/${channelName}" >"Объявления о велозаездах"</a>.`;
  const third =
    '\nЗадам несколько вопросов о планируем Вами заезде и размещу объявление на канале,';
  const fourth = ' чтобы все желающие могли поучаствовать в Вашем заезде!\nНачнём ? /rideon';
  return first + second + third + fourth;
}

export const sendGreeting = async (
  ctx: IBotContext,
  userName = 'незнакомец'
): Promise<void> => {
  // если сессия пуста или нет названия канала, то сообщение об ошибке
  const channelName = ctx.session?.channelName;

  if (!channelName) {
    await sendUnknownError(ctx);
    return;
  }

  await ctx.reply(`Привет ${userName} ! ${startMessage(channelName)}`, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  });
};
