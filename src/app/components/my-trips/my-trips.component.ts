import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyResponse } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';
import { TripState } from 'src/app/store/trip/trip.reducer';

import * as TripSelectors from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTripsComponent implements OnInit {
  currencyResponse$!: Observable<CurrencyResponse>;
  myTripsResponse$!: Observable<TripsModel[]>;
  selectedTrip$!: Observable<TripsModel>;
  user: User = JSON.parse(localStorage.getItem('user')!);

  constructor(private tripStore: Store<TripState>) {}

  ngOnInit(): void {
    this.myTripsResponse$ = this.tripStore.pipe(
      select(TripSelectors.selectUserTrips)
    );
    this.selectedTrip$ = this.tripStore.pipe(
      select(TripSelectors.selectSelectedUserTrip)
    );
  }
}
