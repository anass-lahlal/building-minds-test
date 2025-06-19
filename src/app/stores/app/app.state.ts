import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppActions } from './app.actions';
import { patch } from '@ngxs/store/operators';
import { Tags } from '../../models/tags.enum';

export interface AppStateModel {
  tags: Tags[];
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
  static tags(state: AppStateModel) {
    return state.tags ?? [];
  }

  @Action(AppActions.UpdateTags)
  updateTags({ setState }: StateContext<AppStateModel>, { tags }: AppActions.UpdateTags) {
    setState(patch({ tags }));
  }
}
