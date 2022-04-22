import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrip from './trip.reducer';

export const selectTripState = createFeatureSelector<fromTrip.TripState>(
  fromTrip.tripFeatureKey
);

export const selectIsLoading = createSelector(
  selectTripState,
  (state) => state.isLoading
);

export const selectUserTrips = createSelector(
  selectTripState,
  (state) => state.userTrips
);

export const selectSelectedUserTrip = createSelector(
  selectTripState,
  // selectTripItineraries,
  (state) => ({ ...state.selectedUserTrip })
);
