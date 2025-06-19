import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Site, SiteType } from '../../models/site.model';
import { SitesActions } from './sites.actions';
import { patch } from '@ngxs/store/operators';

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
  @Action(SitesActions.UpdateSiteTypeFilter)
  updateSiteTypeFilter(
    { setState, getState }: StateContext<SitesStateModel>,
    { type }: SitesActions.UpdateSiteTypeFilter
  ) {
    const filters = getState().filters;
    setState(patch({ filters: { ...filters, type } }));
  }

  @Action(SitesActions.LoadSites)
  updateSites({ setState }: StateContext<SitesStateModel>) {
    setState(patch({ sites: [] }));
  }
}
