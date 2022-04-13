import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ItineraryActions from './itinerary.actions';



@Injectable()
export class ItineraryEffects {

  itinItinerarys$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ItineraryActions.itinItinerarys),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ItineraryActions.itinItinerarysSuccess({ data })),
          catchError(error => of(ItineraryActions.itinItinerarysFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
