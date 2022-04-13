import { createAction, props } from '@ngrx/store';
import User from 'src/app/models/user';

export const userUsers = createAction('[User] User Users');

export const userUsersSuccess = createAction(
  '[User] User Users Success',
  props<{ data: any }>()
);

export const userUsersFailure = createAction(
  '[User] User Users Failure',
  props<{ error: any }>()
);

export const getUser = createAction('[User] getUser');

export const getUserComplete = createAction(
  '[User] getUserComplete',
  props<{ user: User }>()
);
