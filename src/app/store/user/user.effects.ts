import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as UserActions from './user.actions';



@Injectable()
export class UserEffects {

  userUsers$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UserActions.userUsers),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => UserActions.userUsersSuccess({ data })),
          catchError(error => of(UserActions.userUsersFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
