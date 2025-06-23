import dotenv from 'dotenv';

const { error, parsed } = dotenv.config();

if (error) {
  throw new Error('Не найден файл .env');
}

if (!parsed) {
  throw new Error('Пустой файл .env');
}

/**
 * Проверка данных, получаемых из переменных окружения .env
 */
export function getEnvVar<T extends 'string' | 'number'>(
  key: string,
  type: T
): T extends 'string' ? string : number {
  const value = parsed?.[key] ?? process.env[key];

  if (!value) {
    throw new Error(`Не указана переменная окружения ${key}`);
  }

  if (type === 'number') {
    const num = +value;
    if (Number.isNaN(num)) {
      throw new Error(`Переменная ${key} должна быть числом`);
    }
    return num as T extends 'string' ? never : number;
  }

  return value as T extends 'string' ? string : never;
}
