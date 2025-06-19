import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppActions } from './app.actions';
import { patch } from '@ngxs/store/operators';

export interface AppStateModel {
  tags: string[];
}

const initialState: AppStateModel = {
  tags: [],
};

@State({
  name: 'app',
  defaults: initialState,
})
@Injectable()
export class AppState {
  @Selector()
  static getTags(state: AppStateModel) {
    return state.tags ?? [];
  }

  @Action(AppActions.UpdateTags)
  updateTags({ setState }: StateContext<AppStateModel>, { tags }: AppActions.UpdateTags) {
    setState(patch({ tags }));
  }
}
