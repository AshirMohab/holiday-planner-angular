import { createAction, props } from '@ngrx/store';

export const tripTrips = createAction(
  '[Trip] Trip Trips'
);

export const tripTripsSuccess = createAction(
  '[Trip] Trip Trips Success',
  props<{ data: any }>()
);

export const tripTripsFailure = createAction(
  '[Trip] Trip Trips Failure',
  props<{ error: any }>()
);
