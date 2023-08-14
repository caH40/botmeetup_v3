import { Telegraf } from 'telegraf';

import { IBotContext } from '../interface/context.interface.js';
import { getActionDate } from '../menu/rideon/action/main/date.js';
import { getActionLocation } from '../menu/rideon/action/main/location.js';
import { getActionTime } from '../menu/rideon/action/main/time.js';
import { getActionWeather } from '../menu/rideon/action/main/weather.js';
import { getActionDistance } from '../menu/rideon/action/main/distance.js';
import { getActionSpeed } from '../menu/rideon/action/main/speed.js';
import { getActionPicture } from '../menu/rideon/action/main/picture.js';
import { getActionDescription } from '../menu/rideon/action/main/description.js';
import { getActionSummary } from '../menu/rideon/action/main/summary.js';
import { getActionPattern } from '../menu/rideon/action/main/pattern.js';

import { getActionsTimes } from '../menu/rideon/action/sub/time-sub.js';
import { getActionDateStart } from '../menu/rideon/action/sub/date-start.js';
import { getActionDistances } from '../menu/rideon/action/sub/distance-sub.js';
import { getActionSpeeds } from '../menu/rideon/action/sub/speed-sub.js';
import { getActionLocationStart } from '../menu/rideon/scene/location/action/location.action.js';
import { getActionLocationWeatherStart } from '../menu/rideon/scene/location_weather/action/location_weather.action.js';

// action для главного меню rideon
const getActionRideonMain = (bot: Telegraf<IBotContext>): void[] => [
  getActionDate(bot),
  getActionTime(bot),
  getActionLocation(bot),
  getActionWeather(bot),
  getActionDistance(bot),
  getActionSpeed(bot),
  getActionPicture(bot),
  getActionDescription(bot),
  getActionPattern(bot),
  getActionSummary(bot),
];

// action для подменю rideon
const getActionRideonSub = (bot: Telegraf<IBotContext>): void[] => [
  getActionDateStart(bot),
  getActionsTimes(bot),
  getActionDistances(bot),
  getActionSpeeds(bot),
];

// объединение всех action в один массив
export const actions = (bot: Telegraf<IBotContext>): void[] => [
  ...getActionRideonMain(bot),
  ...getActionRideonSub(bot),
  getActionLocationStart(bot), // action выбора города, где будет старт заезда
  getActionLocationWeatherStart(bot), // action выбора города, где будет мониториться погода
];
