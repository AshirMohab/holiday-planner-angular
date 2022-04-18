import { createAction, props } from '@ngrx/store';
import ItineraryItem from 'src/app/models/itineraryItem';

export const itineraryItinerarys = createAction(
  '[Itinerary] Itinerary Itinerarys'
);

export const itineraryItinerarysSuccess = createAction(
  '[Itinerary] Itinerary Itinerarys Success',
  props<{ data: any }>()
);

export const itineraryItinerarysFailure = createAction(
  '[Itinerary] Itinerary Itinerarys Failure',
  props<{ error: any }>()
);

export const getTripItineraries = createAction(
  '[Itinerary] getTripItineraries'
);

export const getTripItinerariesCompleted = createAction(
  '[Itinerary] getTripItinerariesCompleted',
  props<{ tripItineraries: ItineraryItem[] }>()
);

export const setSelectedTripItinerary = createAction(
  '[Itinerary] setSelectedTripItinerary',
  props<{ selectedItineraryItem: ItineraryItem }>()
);
