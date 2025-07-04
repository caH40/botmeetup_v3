/**
 * Формирование url на яндекс карты по координатам.
 */
export function generateYandexMapLink(lat: number, lon: number, zoom = 16) {
  return `https://yandex.ru/maps/?pt=${lon},${lat}&z=${zoom}&l=map`;
}
