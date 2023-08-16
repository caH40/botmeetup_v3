import { IWeatherWeek } from '../../interface/model/weatherweek.interface.js';

// форма для погоды в дискуссионной группе к объявлению о велозаезде
export const formWeather = (weatherCurrent: IWeatherWeek | undefined): string | undefined => {
  if (!weatherCurrent) {
    return;
  }

  const cityNameStr = `<b>Место мониторинга:</b> ${weatherCurrent.city.name ?? '---'}\n`;
  const tempMornStr = `<b>Температура утром:</b> ${weatherCurrent.tempMorn ?? '---'}°C\n`;
  const tempDayStr = `<b>Температура днём:</b> ${weatherCurrent.tempDay ?? '---'}°C\n`;
  const tempEveStr = `<b>Температура вечером:</b> ${weatherCurrent.tempEve ?? '---'}°C\n`;
  const humidityStr = `<b>Влажность:</b> ${weatherCurrent.humidity ?? '---'}%\n`;
  const windSpeedStr = `<b>Скорость ветра:</b> ${weatherCurrent.windSpeed ?? '---'}м/с\n`;
  const descStr = `<b>Описание:</b> ${weatherCurrent.desc ?? 'Нет данных о погоде.'}`;

  const arrayWithStrings = [
    cityNameStr,
    tempMornStr,
    tempDayStr,
    tempEveStr,
    humidityStr,
    windSpeedStr,
    descStr,
  ];

  return arrayWithStrings.reduce((acc, cur) => acc + cur, '');
};
