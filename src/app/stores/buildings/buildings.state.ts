import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Building, BuildingType } from '../../models/building.model';
import { BuildingsActions } from './buildings.actions';
import { patch } from '@ngxs/store/operators';

export interface BuildingsStateModel {
  filters: {
    type: BuildingType | null;
  };
  buildings: Building[];
}

const intialState: BuildingsStateModel = {
  filters: {
    type: null,
  },
  buildings: [],
};

@State({
  name: 'buildings',
  defaults: intialState,
})
@Injectable()
export class BuildingsState {
  @Action(BuildingsActions.UpdateBuildingTypeFilter)
  updateBuildingTypeFilter(
    { setState, getState }: StateContext<BuildingsStateModel>,
    { type }: BuildingsActions.UpdateBuildingTypeFilter
  ) {
    const filters = getState().filters;
    setState(patch({ filters: { ...filters, type } }));
  }

  @Action(BuildingsActions.LoadBuildings)
  updateBuildings({ setState }: StateContext<BuildingsStateModel>) {
    setState(patch({ buildings: [] }));
  }
}
