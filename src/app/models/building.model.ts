import { Tags } from './tags.enum';

export enum BuildingType {
  House,
  Flat,
  Office,
  Shop,
  Warehouse,
  Factory,
  Other,
}

export interface Building {
  id: number;
  name: string;
  tags: Tags[];
  buildingType: BuildingType;
}
