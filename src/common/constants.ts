import { IRegular } from '../interface/regular.interface.js';

export const millisecondsInDay = 86400000;

export const regular: IRegular = {
  dateStart: /dateStart_[А-Яа-я]{2}\.,\s{1}[0-9]{2}\.[0-9]{2}\.[0-9]{4}/,
  timeStart: /timeStart_\d{1,2}:\d{2}/,
  distanceStart: /distanceStart_\d{1,4}.{2,3}/,
  speedStart: /speedStart_\d{1,2}км\/ч/,
  // кнопка выбора города, где будет старт
  locationStart: /mainLocation_.+/,
  locationWeatherStart: /weather_.+/,
};

export const distanceSummary: string[] = [
  '40км',
  '60км',
  '80км',
  '100км',
  '120км',
  '140км',
  '160км',
  '180км',
  '200км',
  '200+км',
  '300+км',
  '400+км',
];

// Средняя скорость
export const speedSummary = ['20км/ч', '25км/ч', '28км/ч', '30км/ч', '35км/ч', '40км/ч'];
