import { IPollUser } from '../interface/polluser.interface.js';

export const getPollUsers = (
  pollUsers: IPollUser[],
  pollUser: IPollUser,
  pollOption: number[]
): IPollUser[] => {
  // исключение дублирование голосования одним и тем же пользователем:
  // pollOption[0]===0 приходит когда голосует "ЗА", также когда снимает свой голос с "ЗА"
  const pollUsersCurrent = [...pollUsers];

  // есть ли в массиве проголосовавших
  const hasPollUser = Boolean(pollUsers.find((user) => user.userId === pollUser.userId));

  if (pollOption[0] === 0 && !hasPollUser) {
    pollUsersCurrent.push(pollUser);
    return pollUsersCurrent;
  } else {
    // удаление из массивов пользователя pollUser,
    // который отменил свое голосования, а ранне он голосовал "ЗА"
    return pollUsersCurrent.filter((user) => user.userId !== pollUser.userId);
  }
};
