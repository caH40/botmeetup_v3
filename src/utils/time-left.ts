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
