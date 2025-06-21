import { IWeatherWeek } from '../../interface/model/weatherweek.interface.js';

// форма для погоды в дискуссионной группе к объявлению о велозаезде
export const formWeather = (
  weatherCurrent: IWeatherWeek | undefined,
  weatherLocationName: string
): string | undefined => {
  if (!weatherCurrent) {
    return;
  }

  const cityNameStr = `<b>Место мониторинга:</b> ${weatherLocationName ?? '---'}\n`;
  const tempMornStr = `<b>Температура:</b> ${weatherCurrent.temp ?? '---'}°C\n`;
  const humidityStr = `<b>Влажность:</b> ${weatherCurrent.humidity ?? '---'}%\n`;
  const windSpeedStr = `<b>Скорость ветра:</b> ${weatherCurrent.wind.speed ?? '---'}м/с\n`;
  const descStr = `<b>Описание:</b> ${
    weatherCurrent.weather.description ?? 'Нет данных о погоде.'
  }`;

  const arrayWithStrings = [cityNameStr, tempMornStr, humidityStr, windSpeedStr, descStr];

  return arrayWithStrings.reduce((acc, cur) => acc + cur, '');
};
