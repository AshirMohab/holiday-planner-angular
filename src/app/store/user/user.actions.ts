import { createAction, props } from '@ngrx/store';

export const userUsers = createAction(
  '[User] User Users'
);

export const userUsersSuccess = createAction(
  '[User] User Users Success',
  props<{ data: any }>()
);

export const userUsersFailure = createAction(
  '[User] User Users Failure',
  props<{ error: any }>()
);
