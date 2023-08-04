export const millisecondsInDay = 86400000;

export const regular = {
  dateStart: /dateStart_[А-Яа-я]{2}\.,\s{1}[0-9]{2}\.[0-9]{2}\.[0-9]{4}/,
  timeStart: /timeStart_\d{1,2}:\d{2}/,
  distanceStart: /distanceStart_\d{1,4}.{2,3}/,
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
