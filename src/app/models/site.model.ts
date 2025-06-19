import { Tags } from './tags.enum';

export enum SiteType {
  Urban,
  Suburban,
  Rural,
}

export interface Site {
  id: number;
  name: string;
  tags: Tags[];
  siteType: SiteType;
}
