export interface IWeatherDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: ITemp;
  feels_like: IFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [IWeather];
  clouds: number;
  pop: number;
  uvi: number;
}

interface ITemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
interface IFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
