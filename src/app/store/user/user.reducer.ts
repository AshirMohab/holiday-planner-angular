import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(UserActions.userUsers, state => state),
  on(UserActions.userUsersSuccess, (state, action) => state),
  on(UserActions.userUsersFailure, (state, action) => state),

);
