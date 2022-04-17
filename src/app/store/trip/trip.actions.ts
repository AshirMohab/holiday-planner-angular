import { createAction, props } from '@ngrx/store';
import TripsModel from 'src/app/models/tripsModel';

export const tripTrips = createAction('[Trip] Trip Trips');

export const tripTripsSuccess = createAction(
  '[Trip] Trip Trips Success',
  props<{ data: any }>()
);

export const tripTripsFailure = createAction(
  '[Trip] Trip Trips Failure',
  props<{ error: any }>()
);

export const addUserTrip = createAction('[Trip] addUserTrip');

export const addUserTripComplete = createAction(
  '[Trip] addUserTrip',
  props<{
    userTrip:
      | TripsModel
      | {
          currency: '';
          description: '';
          itinerary: [];
          name: '';
          userEmail: '';
        };
  }>()
);

export const getUserTrips = createAction('[Trip] getUserTrips');

export const getUserTripsCompleted = createAction(
  '[Trip] getUserTrips',
  props<{ userTrips: TripsModel[] }>()
);

export const setSelectedUserTrip = createAction(
  '[Trip] getUserTrips',
  props<{ userTrips: TripsModel }>()
);

// export const getUserTripsCompleted = createAction(
//   '[Trip] getUserTrips',
//   props<{ userTrips: TripsModel[] }>()
// );
