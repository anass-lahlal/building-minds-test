import { Injectable } from '@angular/core';
import { Building, BuildingType } from '../models/building.model';
import { Tags } from '../models/tags.enum';

@Injectable()
export class BuildingsService {
  async getBuildings(tags: Tags[], type: BuildingType | null): Promise<Building[]> {
    //Supposed to get buildings from server
    const data: Building[] = [];
    const filtered = this.filterBuildings(data, tags, type);
    return filtered;
  }

  private filterBuildings(buildings: Building[], tags: Tags[], type: BuildingType | null): Building[] {
    return buildings.filter((building) => {
      return tags.every((tag) => building.tags.includes(tag)) && (!type || building.buildingType === type);
    });
  }
}
