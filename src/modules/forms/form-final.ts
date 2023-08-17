import { errorHandler } from '../../errors/error.js';
import { IPostData } from '../../interface/postdata.interdace.js';
import { getTimeLeft } from '../../utils/time-left.js';

export function formFinalPost(postData: IPostData) {
  try {
    //строка о погоде
    const tempDay = postData.tempDay ? `${Math.round(+postData.tempDay)}°C` : '-';
    const humidity = `${postData.humidity ?? '-'}%`;
    const descriptionWeather = `${postData.descriptionWeather ?? '-'}`;
    const weatherStr = `${tempDay}, ${humidity}, ${descriptionWeather};`;
    const weatherTitle = `<b>Погода (${postData.locationWeather ?? '---'}):</b>`;

    // время до старта
    const timeLeft = getTimeLeft(postData.dateStart, postData.time);

    const descriptionStr = `${postData.description ?? 'Детали заезда:'}\n`;
    const locationStr = `<b>Место старта:</b> ${postData.location ?? '---'};\n`;
    const dateStartStr = `<b>Дата заезда:</b> ${postData.dateStart ?? '---'};\n`;
    const timeStr = `<b>Время старта:</b> ${postData.time ?? '---'};\n`;
    const timeLeftStr = `<b>Осталось до старта:</b> ${timeLeft ?? '-'};\n`;
    const distanceStr = `<b>Дистанция:</b> ${postData.distance ?? '---'};\n`;
    const speedStr = `<b>Темп:</b> ${postData.speed ?? '---'};\n`;
    const locationWeatherStr = `${weatherTitle} ${weatherStr}\n`;
    const leaderStr = `<b>Организатор заезда:</b> ${postData.leader ?? '-'}\n`;
    const pollQuantityStr = `<b>Количество участников:</b> ${postData.pollQuantity ?? 0}`;

    const arrayWithStrings = [
      descriptionStr,
      locationStr,
      dateStartStr,
      timeStr,
      timeLeftStr,
      distanceStr,
      speedStr,
      locationWeatherStr,
      leaderStr,
      pollQuantityStr,
    ];

    return arrayWithStrings.reduce((acc, cur) => acc + cur, '');
  } catch (error) {
    errorHandler(error);
    return 'Ошибка при формировании объявления';
  }
}
