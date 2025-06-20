import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Site, SiteType } from '../../models/site.model';
import { SitesActions } from './sites.actions';
import { patch } from '@ngxs/store/operators';
import { SitesService } from '../../services/sites.service';
import { AppState } from '../app/app.state';
import { AppActions } from '../app/app.actions';

/**
 * NOTE:
 * Similar to BuildingsState, this state is created to manage the state of the sites.
 */

export interface SitesStateModel {
  filters: {
    type: SiteType | null;
  };
  sites: Site[];
  loading: boolean;
}

const initialState: SitesStateModel = {
  filters: {
    type: null,
  },
  sites: [],
  loading: false,
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

  @Selector()
  static loading(state: SitesStateModel) {
    return state.loading;
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

    setState(patch({ loading: true }));

    const sites = await this.sitesService.getSites(tags, filters.type);

    setState(patch({ sites, loading: false }));
  }

  @Action(AppActions.TagsUpdated)
  refreshSites({ dispatch }: StateContext<SitesStateModel>) {
    dispatch(new SitesActions.LoadSites());
  }
}
