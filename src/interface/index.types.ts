export type TGeoAddress = { name: string; description: string };
export type TGeoCoords = [number, number];
export type TGeo = {
  address: TGeoAddress;
  coords: TGeoCoords;
};
