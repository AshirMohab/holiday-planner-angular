import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CurrencyResponse, CurrencyType } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';
import { CurrencyService } from 'src/app/services/currency.service';
import { UserService } from 'src/app/services/user.service';
import {
  getUserTripsCompleted,
  setSelectedUserTrip,
} from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';

import * as TripActions from 'src/app/store/trip/trip.actions';
import * as TripSelectors from 'src/app/store/trip/trip.selectors';
import { UserState } from 'src/app/store/user/user.reducer';
import { selectCurrentUser } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit {
  currencyResponse$!: Observable<CurrencyResponse>;
  myTripsResponse$!: Observable<TripsModel[]>;
  selectedTrip$!: Observable<TripsModel>;
  // destroy$ = new Subject<boolean>();
  user: User = JSON.parse(localStorage.getItem('user')!);

  isAddingTrip: boolean = false;
  addingTrip: boolean = false;
  isShowingTrips: boolean = true;
  isEditTrips: boolean = false;

  constructor(
    private currency: CurrencyService,
    private userService: UserService,
    private stateStore: Store<TripState>,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {
    // this.currencyResponse$ = this.currency.getCurrency();
    this.myTripsResponse$ = this.stateStore.pipe(
      select(TripSelectors.selectUserTrips)
    );
    this.selectedTrip$ = this.stateStore.pipe(
      select(TripSelectors.selectSelectedUserTrip)
    );

    // this.userStore
    //   .pipe(takeUntil(this.destroy$), select(selectCurrentUser))
    //   .subscribe(() => this.stateStore.dispatch(TripActions.getUserTrips()));
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  // }

  identifyCurrency(index: number, currency: CurrencyType): string {
    return currency.CurrencyData.code;
  }

  identifyTrips(index: number, trip: TripsModel): string {
    return trip.userEmail;
  }

  selectUserTrip(selectedUserTrip: TripsModel) {
    this.stateStore.dispatch(
      TripActions.setSelectedUserTrip({ selectedUserTrip })
    );
  }
}
