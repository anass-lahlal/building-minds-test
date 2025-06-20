import { inject, Injectable } from '@angular/core';
import { Building, BuildingType } from '../models/building.model';
import { Tags } from '../models/tags.enum';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BuildingsService {
  private http = inject(HttpClient);

  async getBuildings(tags: Tags[], type: BuildingType | null): Promise<Building[]> {
    //Supposed to get buildings from server
    const data = await firstValueFrom(this.http.get<Building[]>('/assets/buildings.json'));
    const filtered = this.filterBuildings(data, tags, type);
    return filtered;
  }

  private filterBuildings(buildings: Building[], tags: Tags[], type: BuildingType | null): Building[] {
    return buildings.filter((building) => {
      return tags.every((tag) => building.tags.includes(tag)) && (!type || building.buildingType === type);
    });
  }
}
