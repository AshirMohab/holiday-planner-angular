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
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => TripActions.tripTripsSuccess({ data })),
          catchError((error) => of(TripActions.tripTripsFailure({ error })))
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
