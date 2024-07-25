import axios, { AxiosResponse } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

import { API_KEY_WEATHER } from '../config/dotenv.js';

export const getWeatherFromApi = async (
  lon: number,
  lat: number
): Promise<AxiosResponse | null> => {
  try {
    const proxyServer = process.env.PROXY;
    if (!proxyServer) {
      throw new Error('Не получен адрес прокси-сервера!');
    }
    const agent = new HttpsProxyAgent(proxyServer);

    const server = 'https://api.openweathermap.org/data/2.5/onecall';
    const query = `lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&exclude=hourly&units=metric&lang=ru`;
    const url = `${server}?${query}`;

    const response = await axios(url, { httpAgent: agent, httpsAgent: agent });

    return response;
  } catch (error) {
    return null;
  }
};
