import { createAction, props } from '@ngrx/store';
import User from 'src/app/models/user';

export const setCurrenctUser = createAction(
  '[User] setCurrentUser',
  props<{ currentUser: User | null }>()
);
