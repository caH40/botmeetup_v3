import { IWeatherWeek } from '../../interface/model/weatherweek.interface.js';

export function formWeather(weatherCurrent: IWeatherWeek | undefined): string | undefined {
  if (!weatherCurrent) {
    return;
  }

  return `Место мониторинга: ${weatherCurrent.city.name ?? '---'}\nТемпература утром: ${
    weatherCurrent.tempMorn ?? '---'
  }°C\nТемпература днём: ${weatherCurrent.tempDay ?? '---'}°C\nТемпература вечером: ${
    weatherCurrent.tempEve ?? '---'
  }°C\nВлажность: ${weatherCurrent.humidity ?? '---'}%\nСкорость ветра: ${
    weatherCurrent.windSpeed ?? '---'
  }м/с\n${weatherCurrent.desc ?? 'Нет данных о погоде.'}`;
}
