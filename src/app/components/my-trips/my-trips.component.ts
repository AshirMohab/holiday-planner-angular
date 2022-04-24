import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyData } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';
import { TripState } from 'src/app/store/trip/trip.reducer';

import * as TripSelectors from 'src/app/store/trip/trip.selectors';
import * as CurrencySelectors from 'src/app/store/currency/currency.selectors';
import { CurrencyState } from 'src/app/store/currency/currency.reducer';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTripsComponent implements OnInit {
  currencyResponse$!: Observable<CurrencyData | null>;
  myTripsResponse$!: Observable<TripsModel[]>;
  selectedTrip$!: Observable<TripsModel>;
  user: User = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private tripStore: Store<TripState>,
    private currencyStore: Store<CurrencyState>
  ) {}

  ngOnInit(): void {
    this.myTripsResponse$ = this.tripStore.pipe(
      select(TripSelectors.selectUserTrips)
    );
    this.selectedTrip$ = this.tripStore.pipe(
      select(TripSelectors.selectSelectedUserTrip)
    );
    this.currencyResponse$ = this.currencyStore.pipe(
      select(CurrencySelectors.selectCurrrencyRates)
    );
  }
}
