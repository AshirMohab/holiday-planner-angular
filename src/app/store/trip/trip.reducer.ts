import { Action, createReducer, on } from '@ngrx/store';
import TripsModel from 'src/app/models/tripsModel';
import * as TripActions from './trip.actions';

export const tripFeatureKey = 'trip';

export interface TripState {
  isLoading: boolean;
  selectedUserTrip: TripsModel;
  userTrips: TripsModel[];
}

export const initialState: TripState = {
  isLoading: false,
  selectedUserTrip: {
    tripID: '',
    currency: '',
    description: '',
    itinerary: [],
    name: '',
    userEmail: '',
  },
  userTrips: [],
};

export const reducer = createReducer(
  initialState,

  on(TripActions.getUserTrips, (state) => ({ ...state, isLoading: true })),

  on(TripActions.getUserTripsCompleted, (state, { userTrips }) => ({
    ...state,
    isLoading: false,
    userTrips,
  })),

  on(TripActions.setSelectedUserTrip, (state, { selectedUserTrip }) => ({
    ...state,
    selectedUserTrip,
  }))
);
