import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as CurrencyActions from './currency.actions';
import { CurrencyService } from 'src/app/services/currency.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class CurrencyEffects {
  getCurrency$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrencyActions.getCurrencyRates),
      concatMap(() =>
        this.currencyService.getCurrency().pipe(
          map((currency) =>
            CurrencyActions.getCurrencyRatesCompleted({
              currencyRates: currency?.data.currencyData,
            })
          ),
          catchError((error) => {
            this.notificationService.error(
              'Unable to remove itinerary item from trip.',
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
    private currencyService: CurrencyService,
    private notificationService: NzNotificationService
  ) {}
}
