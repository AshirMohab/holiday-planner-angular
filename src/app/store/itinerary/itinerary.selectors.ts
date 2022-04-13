import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItinerary from './itinerary.reducer';

export const selectItineraryState = createFeatureSelector<fromItinerary.State>(
  fromItinerary.itineraryFeatureKey
);
