import { Action, createReducer, on } from '@ngrx/store';
import ItineraryItem from 'src/app/models/itineraryItem';
import { setSelectedUserTrip } from '../trip/trip.actions';
import * as ItineraryActions from './itinerary.actions';

export const itineraryFeatureKey = 'itinerary';

export interface State {
  isloading: boolean;
  selectedItineraryItem: ItineraryItem;
  tripItineraries: ItineraryItem[];
}

export const initialState: State = {
  isloading: false,
  selectedItineraryItem: {
    name: '',
    costEstimate: 0,
    endDate: new Date(),
    startDate: new Date(),
    tag: '',
  },
  tripItineraries: [],
};

export const reducer = createReducer(
  initialState,

  on(setSelectedUserTrip, (state) => ({
    ...state,
    isloading: true,
    tripItineraries: initialState.tripItineraries,
    selectedItineraryItem: initialState.selectedItineraryItem,
  })),

  on(
    ItineraryActions.getTripItinerariesCompleted,
    (state, { tripItineraries }) => ({
      ...state,
      isloading: false,
      tripItineraries,
    })
  ),

  on(
    ItineraryActions.setSelectedTripItinerary,
    (state, { selectedItineraryItem }) => ({
      ...state,
      selectedItineraryItem,
    })
  )
);
