import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Building, BuildingType } from '../../models/building.model';
import { BuildingsActions } from './buildings.actions';
import { patch } from '@ngxs/store/operators';
import { AppState } from '../app/app.state';
import { BuildingsService } from '../../services/buildings.service';
import { AppActions } from '../app/app.actions';

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
  private store = inject(Store);
  private buildingsService = inject(BuildingsService);

  @Selector()
  static buildings(state: BuildingsStateModel) {
    return state.buildings;
  }

  @Selector()
  static filters(state: BuildingsStateModel) {
    return state.filters;
  }

  @Action(BuildingsActions.UpdateBuildingTypeFilter)
  updateBuildingTypeFilter(
    { setState, getState, dispatch }: StateContext<BuildingsStateModel>,
    { type }: BuildingsActions.UpdateBuildingTypeFilter
  ) {
    const filters = getState().filters;
    setState(patch({ filters: { ...filters, type } }));

    //Reload buildings
    dispatch(new BuildingsActions.LoadBuildings());
  }

  @Action(BuildingsActions.LoadBuildings)
  async updateBuildings({ setState, getState }: StateContext<BuildingsStateModel>) {
    const { filters } = getState();
    const tags = this.store.selectSnapshot(AppState.tags);

    const buildings = await this.buildingsService.getBuildings(tags, filters.type);

    setState(patch({ buildings }));
  }

  @Action(AppActions.TagsUpdated)
  refreshData({ dispatch }: StateContext<BuildingsStateModel>) {
    dispatch(new BuildingsActions.LoadBuildings());
  }
}
