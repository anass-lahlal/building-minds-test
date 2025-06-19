import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Site, SiteType } from '../../models/site.model';
import { SitesActions } from './sites.actions';
import { patch } from '@ngxs/store/operators';
import { SitesService } from '../../services/sites.service';
import { AppState } from '../app/app.state';

export interface SitesStateModel {
  filters: {
    type: SiteType | null;
  };
  sites: Site[];
}

const initialState: SitesStateModel = {
  filters: {
    type: null,
  },
  sites: [],
};

@State({
  name: 'sites',
  defaults: initialState,
})
@Injectable()
export class SitesState {
  private store = inject(Store);
  private sitesService = inject(SitesService);

  @Selector()
  static filters(state: SitesStateModel) {
    return state.filters;
  }

  @Selector()
  static sites(state: SitesStateModel) {
    return state.sites;
  }

  @Action(SitesActions.UpdateSiteTypeFilter)
  updateSiteTypeFilter(
    { setState, getState, dispatch }: StateContext<SitesStateModel>,
    { type }: SitesActions.UpdateSiteTypeFilter
  ) {
    const filters = getState().filters;
    setState(patch({ filters: { ...filters, type } }));

    //Reload sites
    dispatch(new SitesActions.LoadSites());
  }

  @Action(SitesActions.LoadSites)
  async updateSites({ setState, getState }: StateContext<SitesStateModel>) {
    const { filters } = getState();
    const tags = this.store.selectSnapshot(AppState.tags);

    const sites = await this.sitesService.getSites(tags, filters.type);

    setState(patch({ sites }));
  }
}
