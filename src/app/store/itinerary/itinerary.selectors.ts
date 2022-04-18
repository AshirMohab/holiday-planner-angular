import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItinerary from './itinerary.reducer';

export const selectItineraryState = createFeatureSelector<fromItinerary.State>(
  fromItinerary.itineraryFeatureKey
);

export const selectIsLoading = createSelector(
  selectItineraryState,
  (state) => state.isloading
);

export const selectTripItineraries = createSelector(
  selectItineraryState,
  (state) => state.tripItineraries
);

export const selectSelectedTripItinerary = createSelector(
  selectItineraryState,
  (state) => state.selectedItineraryItem
);
