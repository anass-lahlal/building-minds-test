import { SiteType } from '../../models/site.model';

export namespace SitesActions {
  export class UpdateSiteTypeFilter {
    static readonly type = '[Sites] Update Site Type Filter';
    constructor(public type: SiteType | null) {}
  }

  export class LoadSites {
    static readonly type = '[Sites] Load Sites';
  }
}
