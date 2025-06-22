import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

import { API_KEY_WEATHER } from '../config/dotenv.js';
import { dtoWeatherForecast } from '../dto/weather.js';
import { TWeatherForecast } from '../interface/weather.types.js';
import { Types } from 'mongoose';

type Params = {
  postId: Types.ObjectId;
  lon: number;
  lat: number;
  type?: 'weather' | 'forecast';
};

export const getWeatherFromApi = async ({
  postId,
  lon,
  lat,
  type = 'forecast',
}: Params): Promise<(TWeatherForecast & { postId: Types.ObjectId }) | null> => {
  try {
    if (!API_KEY_WEATHER) {
      throw new Error('Не получен API_KEY для погоды!');
    }

    const proxyServer = process.env.PROXY;
    if (!proxyServer) {
      throw new Error('Не получен адрес прокси-сервера!');
    }
    const agent = new HttpsProxyAgent(proxyServer);

    const server = `https://api.openweathermap.org/data/2.5/${type}`;
    const query = `lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric&lang=ru`;
    const url = `${server}?${query}`;

    const response = await axios(url, { httpAgent: agent, httpsAgent: agent });

    const weatherForecast = dtoWeatherForecast(response.data, postId);

    return weatherForecast;
  } catch (error) {
    console.log(error); // eslint-disable-line

    return null;
  }
};
