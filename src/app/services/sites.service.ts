import { inject, Injectable } from '@angular/core';
import { Site, SiteType } from '../models/site.model';
import { Tags } from '../models/tags.enum';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SitesService {
  private http = inject(HttpClient);

  async getSites(tags: Tags[], type: SiteType | null): Promise<Site[]> {
    //Supposed to get data from server
    const data = await firstValueFrom(this.http.get<Site[]>('/assets/sites.json'));
    const filtered = this.filterSites(data, tags, type);
    return filtered;
  }

  private filterSites(sites: Site[], tags: Tags[], type: SiteType | null): Site[] {
    return sites.filter((site) => {
      return tags.every((tag) => site.tags.includes(tag)) && (!type || site.siteType === type);
    });
  }
}
