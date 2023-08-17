import { IPost } from '../../interface/model/post.interface.js';

// форма поста для повторного использования (патерна объявления)
export const formPattern = (post: IPost, index: number): string => {
  const numberStr = `<u>№${index + 1}</u>\n`;
  const descriptionStr = `${post.description ?? 'Детали заезда:'}\n`;
  const locationStartStr = `<b>Место старта:</b> ${post.locationStart ?? '-'};\n`;
  const dateStr = `<b>Дата заезда:</b> ${post.date ?? '-'};\n`;
  const timeStr = `<b>Время старта:</b> ${post.time ?? '-'};\n`;
  const distanceStr = `<b>Дистанция:</b> ${post.distance ?? '-'};\n`;
  const speedStr = `<b>Tемп:</b> ${post.speed ?? '-'};\n`;
  const locationWeatherStr = `<b>Погода:</b>${post.locationWeather}`;

  const arrayWithStrings = [
    numberStr,
    descriptionStr,
    locationStartStr,
    dateStr,
    timeStr,
    distanceStr,
    speedStr,
    locationWeatherStr,
  ];

  return arrayWithStrings.reduce((acc, cur) => acc + cur, '');
};
