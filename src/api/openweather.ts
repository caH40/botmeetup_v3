import axios, { AxiosResponse } from 'axios';

import { API_KEY_WEATHER } from '../config/dotenv.js';

export const getWeatherFromApi = async (lon: number, lat: number): Promise<AxiosResponse> => {
  const server = 'https://api.openweathermap.org/data/2.5/onecall';
  const query = `lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&exclude=hourly&units=metric&lang=ru`;
  const url = `${server}?${query}`;

  const response = await axios(url);

  return response;
};
