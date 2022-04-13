import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrip from './trip.reducer';

export const selectTripState = createFeatureSelector<fromTrip.State>(
  fromTrip.tripFeatureKey
);
