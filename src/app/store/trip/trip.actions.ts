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

export const updateTrip = createAction(
  '[Trip] updateTrip',
  props<{ trip: TripsModel }>()
);
// export const getUserTripsCompleted = createAction(
//   '[Trip] getUserTrips',
//   props<{ userTrips: TripsModel[] }>()
// );
