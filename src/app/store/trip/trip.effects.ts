import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as TripActions from './trip.actions';
import { UserService } from 'src/app/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
              `Sorry, couldn't get exhange rates.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return of(TripActions.getUserTripsCompleted({ userTrips: [] }));
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private tripService: UserService,
    private notificationService: NzNotificationService
  ) {}
}
