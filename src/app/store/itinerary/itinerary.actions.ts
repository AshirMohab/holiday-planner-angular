import { createAction, props } from '@ngrx/store';

export const itinItinerarys = createAction(
  '[Itinerary] Itin Itinerarys'
);

export const itinItinerarysSuccess = createAction(
  '[Itinerary] Itin Itinerarys Success',
  props<{ data: any }>()
);

export const itinItinerarysFailure = createAction(
  '[Itinerary] Itin Itinerarys Failure',
  props<{ error: any }>()
);
