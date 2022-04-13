import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as TripActions from './trip.actions';



@Injectable()
export class TripEffects {

  tripTrips$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(TripActions.tripTrips),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => TripActions.tripTripsSuccess({ data })),
          catchError(error => of(TripActions.tripTripsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
