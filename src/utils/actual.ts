const millisecondsInHour = 3600000;
const millisecondsInMinute = 60000;

type TTime = { dateMilliseconds: number; todayMilliseconds: number };

// преобразование времени старта и текущего времени в миллисекунды
export const getTime = (date: string, time: string): TTime => {
  const timeArr = time.split(':');
  const timeMilliseconds =
    +timeArr[0] * millisecondsInHour + +timeArr[1] * millisecondsInMinute;

  const dateClear = date.slice(-10);
  const dateArr = dateClear.split('.');
  const dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');

  const dateMilliseconds = new Date(dateNewFormat).getTime() + timeMilliseconds;
  const todayMilliseconds = new Date().getTime();

  return { dateMilliseconds, todayMilliseconds };
};

//в прошедшем заезде не обновлять погоду
export const isNotActualDate = (date: string, time: string) => {
  const { dateMilliseconds, todayMilliseconds } = getTime(date, time);

  return dateMilliseconds < todayMilliseconds;
};
