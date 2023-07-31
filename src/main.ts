import { postMessage } from './modules/test-module.js';

const message: string = 'Hello world';
postMessage('это проверочный текст');

console.log(message);
