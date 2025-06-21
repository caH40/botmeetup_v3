import { getTime, isNotActualDate } from './actual.js';

const millisecondsInHour = 3600000;

export const getTimeLeft = (date: string | undefined, time: string | undefined): string => {
  if (!date || !time) {
    return '---';
  }
  // если старт уже был
  if (isNotActualDate(date, time)) {
    return '<u>СТАРТ УЖЕ БЫЛ!!!</u>';
  }
  // расчет оставшегося времени до заезда
  const ml = getTime(date, time);
  const hoursDecimal = (ml.dateMilliseconds - ml.todayMilliseconds) / millisecondsInHour;
  const hours = Math.trunc(hoursDecimal);
  const minutes = Math.trunc((hoursDecimal - hours) * 60);

  return `${hours}ч, ${minutes}мин`;
};

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function parseRussianDate(dateStr: string, timeStr: string): Date {
  // Убираем день недели
  const dateWithoutWeekday = dateStr.replace(/^.*?,\s*/, '');

  // Разбиваем дату
  const [day, month, year] = dateWithoutWeekday.split('.').map(Number);

  // Разбиваем время
  const [hours, minutes] = timeStr.split(':').map(Number);

  // Возвращаем объект Date (локальное время)
  return new Date(year, month - 1, day, hours, minutes);
}
