import { BuildingType } from '../../models/building.model';

export namespace BuildingsActions {
  export class UpdateBuildingTypeFilter {
    static readonly type = '[Buildings] Update Building Type Filter';
    constructor(public type: BuildingType | null) {}
  }

  export class LoadBuildings {
    static readonly type = '[Buildings] Load Buildings';
  }
}
