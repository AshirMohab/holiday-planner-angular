import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ItineraryActions from './itinerary.actions';
import * as TripActions from '../trip/trip.actions';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';
import { TripService } from 'src/app/services/trip.service';

@Injectable()
export class ItineraryEffects {
  itineraryItinerarys$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.setSelectedUserTrip),
      concatMap(({ selectedUserTrip }) =>
        this.tripService.getTripItinerary(selectedUserTrip.tripID).pipe(
          map((tripItineraries) =>
            ItineraryActions.getTripItinerariesCompleted({ tripItineraries })
          ),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't get trips.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return of(
              ItineraryActions.getTripItinerariesCompleted({
                tripItineraries: [],
              })
            );
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
