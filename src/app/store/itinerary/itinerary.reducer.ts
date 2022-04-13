import { Action, createReducer, on } from '@ngrx/store';
import * as ItineraryActions from './itinerary.actions';

export const itineraryFeatureKey = 'itinerary';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(ItineraryActions.itinItinerarys, state => state),
  on(ItineraryActions.itinItinerarysSuccess, (state, action) => state),
  on(ItineraryActions.itinItinerarysFailure, (state, action) => state),

);
