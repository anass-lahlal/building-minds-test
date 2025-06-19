import { Tags } from './tags.enum';

export enum BuildingType {
  House = 'House',
  Flat = 'Flat',
  Office = 'Office',
  Shop = 'Shop',
  Warehouse = 'Warehouse',
  Factory = 'Factory',
  Other = 'Other',
}

export const buildingTypes = Object.values(BuildingType);

export interface Building {
  id: number;
  name: string;
  tags: Tags[];
  buildingType: BuildingType;
}
