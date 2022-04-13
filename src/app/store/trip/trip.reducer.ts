import { Action, createReducer, on } from '@ngrx/store';
import * as TripActions from './trip.actions';

export const tripFeatureKey = 'trip';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(TripActions.tripTrips, state => state),
  on(TripActions.tripTripsSuccess, (state, action) => state),
  on(TripActions.tripTripsFailure, (state, action) => state),

);
