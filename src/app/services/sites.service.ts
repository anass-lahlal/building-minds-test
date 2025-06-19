import { Injectable } from '@angular/core';
import { Site, SiteType } from '../models/site.model';
import { Tags } from '../models/tags.enum';

@Injectable()
export class SitesService {
  async getSites(tags: Tags[], type: SiteType | null): Promise<Site[]> {
    //Supposed to get data from server
    const data: Site[] = [];
    const filtered = this.filterSites(data, tags, type);
    return filtered;
  }

  private filterSites(sites: Site[], tags: Tags[], type: SiteType | null): Site[] {
    return sites.filter((site) => {
      return tags.every((tag) => site.tags.includes(tag)) && (!type || site.siteType === type);
    });
  }
}
