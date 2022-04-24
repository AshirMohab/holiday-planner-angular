import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  withLatestFrom,
  first,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as TripActions from './trip.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TripService } from 'src/app/services/trip.service';
import { selectCurrentUser } from '../user/user.selectors';
import { UserState } from '../user/user.reducer';
import { select, Store } from '@ngrx/store';
import { setCurrenctUser } from '../user/user.actions';

@Injectable()
export class TripEffects {
  getUserTrips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.getUserTrips, setCurrenctUser),
      withLatestFrom(this.userStore.pipe(select(selectCurrentUser))),
      concatMap(([action, currentUser]) => {
        if (!currentUser) return EMPTY;
        return this.tripService.getUserTrips(currentUser?.uid).pipe(
          map((userTrips) => TripActions.getUserTripsCompleted({ userTrips })),
          catchError((error) => {
            this.notificationService.error(
              `Unable to get all trips`,
              error.toString(),
              { nzDuration: 0 }
            );
            return of(TripActions.getUserTripsCompleted({ userTrips: [] }));
          })
        );
      })
    );
  });

  tripAddition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.addUserTrip),
      concatMap(({ newTrip }) =>
        this.tripService.addUserTrip(newTrip).pipe(
          map(() => TripActions.getUserTrips()),
          catchError((error) => {
            this.notificationService.error(
              `Unable to add your trip.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        )
      )
    );
  });

  updateUserTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.updateUserTrip),
      concatMap((action) => {
        return this.tripService.getTripId(action.trip).pipe(
          first(),
          map((res) => {
            if (!res) throw new Error(`Unable to find trip for editing`);
            return TripActions.updateUserTripById({
              trip: action.trip,
              tripDBId: res,
            });
          }),
          catchError((error) => {
            this.notificationService.error(
              `Unable to update that trip for editing.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        );
      })
    );
  });

  tripUpdateById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.updateUserTripById),
      concatMap((action) =>
        this.tripService.updateTripById(action.trip, action.tripDBId).pipe(
          map(() => TripActions.getUserTrips()),
          catchError((error) => {
            this.notificationService.error(
              `Unable to update trip.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        )
      )
    );
  });

  removeUserTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.removeUserTrip),
      concatMap((action) => {
        return this.tripService.getTripId(action.trip).pipe(
          first(),
          map((res) => {
            if (!res) throw new Error(`Unable to find trip for editing`);
            return TripActions.removeUserTripByID({
              trip: action.trip,
              tripID: res,
            });
          }),
          catchError((error) => {
            this.notificationService.error(
              `Unable to update that trip for editing.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        );
      })
    );
  });

  removeUserTripByID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.removeUserTripByID),
      concatMap(({ tripID }) =>
        this.tripService.removeUserTrip(tripID).pipe(
          map(() => TripActions.getUserTrips()),
          catchError((error) => {
            this.notificationService.error(
              `Unable to remove trip.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private tripService: TripService,
    private notificationService: NzNotificationService,
    private userStore: Store<UserState>
  ) {}
}
