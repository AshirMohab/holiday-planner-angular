import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as TripActions from './trip.actions';
import { UserService } from 'src/app/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TripService } from 'src/app/services/trip.service';

@Injectable()
export class TripEffects {
  tripTrips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.getUserTrips),
      concatMap(() =>
        this.tripService.getUserTrips().pipe(
          map((userTrips) => TripActions.getUserTripsCompleted({ userTrips })),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't get trips.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return of(TripActions.getUserTripsCompleted({ userTrips: [] }));
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
    private notificationService: NzNotificationService
  ) {}
}
