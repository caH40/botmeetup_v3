import { Telegraf } from 'telegraf';

import { IBotContext } from '../interface/context.interface.js';
import { getActionDate } from '../menu/rideon/action/main/date.js';
import { getActionTime } from '../menu/rideon/action/main/time.js';
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

import { getActionEditFromPreview } from '../menu/rideon/action/sub/edit.js';
import { getActionPublication } from '../menu/rideon/action/sub/publication.js';
import { getActionPatternGet } from '../menu/rideon/action/sub/pattern-get.js';
import { getActionPatternDel } from '../menu/rideon/action/sub/pattern-del.js';
import { getActionPatternGetOne } from '../menu/rideon/action/sub/pattern-get-one.js';
import { getActionPatternDelOne } from '../menu/rideon/action/sub/pattern-del-one.js';
import { getActionEditPost } from '../menu/edit/action/edit-post.js';
import { getActionDeletePost } from '../menu/edit/action/delete-post.js';
import { getActionSummaryForEdit } from '../menu/edit/action/summary.js';
import { getActionPublicationFromEdit } from '../menu/edit/action/publication.js';

// action для главного меню rideon
const getActionRideonMain = (bot: Telegraf<IBotContext>): void[] => [
  getActionDate(bot),
  getActionTime(bot),
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
  getActionEditFromPreview(bot),
  getActionPublication(bot),

  // паттерны
  getActionPatternGet(bot),
  getActionPatternDel(bot),
  getActionPatternGetOne(bot),
  getActionPatternDelOne(bot),

  // редактирование/удаление постов
  getActionEditPost(bot),
  getActionDeletePost(bot),
  getActionSummaryForEdit(bot),
  getActionPublicationFromEdit(bot),
];

// объединение всех action в один массив
export const actions = (bot: Telegraf<IBotContext>): void[] => [
  ...getActionRideonMain(bot),
  ...getActionRideonSub(bot),
];
