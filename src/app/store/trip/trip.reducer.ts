import { Action, createReducer, on } from '@ngrx/store';
import TripsModel from 'src/app/models/tripsModel';
import * as TripActions from './trip.actions';

export const tripFeatureKey = 'trip';

export interface TripState {
  isLoading: boolean;
  selectedUserTrip: TripsModel;
  userTrips: TripsModel[];
  userTrip: TripsModel;
}

export const initialState: TripState = {
  isLoading: false,
  selectedUserTrip: {
    currency: '',
    description: '',
    itinerary: [],
    name: '',
    userEmail: '',
  },
  userTrips: [],

  userTrip: {
    currency: '',
    description: '',
    itinerary: [],
    name: '',
    userEmail: '',
  },
};

export const reducer = createReducer(
  initialState,

  on(TripActions.addUserTrip, (state) => ({ ...state })),

  on(TripActions.addUserTripComplete, (state, { userTrip }) => ({
    ...state,
    userTrip,
  })),

  on(TripActions.getUserTrips, (state) => ({ ...state, isLoading: true })),

  on(TripActions.getUserTripsCompleted, (state, { userTrips }) => ({
    ...state,
    isLoading: false,
    userTrips,
  })),

  on(TripActions.setSelectedUserTrip, (state, { userTrips }) => ({
    ...state,
    selectedUserTrip: userTrips,
  }))
);
