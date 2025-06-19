import { Tags } from './tags.enum';

export enum SiteType {
  Urban = 'Urban',
  Suburban = 'Suburban',
  Rural = 'Rural',
}

export const siteTypes = Object.keys(SiteType);

export interface Site {
  id: number;
  name: string;
  tags: Tags[];
  siteType: SiteType;
}
