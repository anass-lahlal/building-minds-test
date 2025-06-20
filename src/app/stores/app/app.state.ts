import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppActions } from './app.actions';
import { patch } from '@ngxs/store/operators';
import { Tags } from '../../models/tags.enum';

/**
 * NOTE:
 * I'm using this state as a global state, where I can store global data such as config.
 * Since the tags are shared on a global level, I leaned towards this solution.
 *
 * The AppActions.TagsUpdated action is used to notify the app that the tags have been updated, so any other state can listen to it and update itself.
 */

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
  updateTags({ setState, dispatch }: StateContext<AppStateModel>, { tags }: AppActions.UpdateTags) {
    setState(patch({ tags }));

    dispatch(new AppActions.TagsUpdated());
  }
}
