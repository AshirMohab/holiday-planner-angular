import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as TripActions from './trip.actions';
import { UserService } from 'src/app/services/user.service';
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
        // const currentUser = { uid: 'yDYYtFyxd3QqkA9FTevxOOC7Suy2' };
        console.log(action);
        console.log(currentUser);
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

  tripUpdate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.updateTrip),
      concatMap(({ trip }) =>
        this.tripService.editUserTrip(trip).pipe(
          map(() => TripActions.getUserTrips()),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't update trip.`,
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
    private userService: UserService,
    private userStore: Store<UserState>
  ) {}
}
