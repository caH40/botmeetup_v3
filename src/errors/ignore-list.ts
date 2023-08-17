const telegramModifyMessage =
  '400: Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a current content and reply markup of the message';
const telegramMessageNotFound = '400: Bad Request: message to delete not found';

export const ignoreList = [telegramModifyMessage, telegramMessageNotFound];
