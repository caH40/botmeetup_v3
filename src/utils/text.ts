import { TGeoAddress } from '../interface/index.types';

/**
 * Формирует строку адреса места старта или погоды.
 */
export function getLocationName(address?: TGeoAddress): string {
  if (!address) {
    return '';
  }

  const { description = '', name = '' } = address;

  return [description, name].filter(Boolean).join(' ');
}
