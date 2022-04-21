import { createAction, props } from '@ngrx/store';
import TripsModel from 'src/app/models/tripsModel';

export const addUserTrip = createAction(
  '[Trip] addUserTrip',
  props<{ newTrip: TripsModel }>()
);

export const getUserTrips = createAction('[Trip] getUserTrips');

export const getUserTripsCompleted = createAction(
  '[Trip] getUserTripsCompleted',
  props<{ userTrips: TripsModel[] }>()
);

export const setSelectedUserTrip = createAction(
  '[Trip] setSelectedUserTrip',
  props<{ selectedUserTrip: TripsModel }>()
);

export const updateUserTrip = createAction(
  '[Trip] updateUserTrip',
  props<{ trip: TripsModel }>()
);

export const updateUserTripById = createAction(
  '[Trip] updateUserTripById',
  props<{ trip: TripsModel; tripDBId: string }>()
);

export const removeUserTrip = createAction(
  '[Trip] removeUserTrip',
  props<{ tripToRemove: TripsModel }>()
);

export const removeTripItinerary = createAction(
  '[Trip] removeTripItinerary',
  props<{ trip: TripsModel }>()
);
// export const getUserTripsCompleted = createAction(
//   '[Trip] getUserTrips',
//   props<{ userTrips: TripsModel[] }>()
// );
