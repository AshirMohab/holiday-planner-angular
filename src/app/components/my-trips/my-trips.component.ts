import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyResponse, CurrencyType } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';
import { CurrencyService } from 'src/app/services/currency.service';
import { UserService } from 'src/app/services/user.service';
import { TripState } from 'src/app/store/trip/trip.reducer';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit {
  currencyResponse$!: Observable<CurrencyResponse>;
  myTripsResponse$!: Observable<TripsModel>;
  user: User = JSON.parse(localStorage.getItem('user')!);

  isAddingTrip: boolean = false;
  addingTrip: boolean = false;

  trips = this.getMyTrips();

  constructor(
    private currency: CurrencyService,
    private userService: UserService,
    private stateStore: Store<TripState>
  ) {}

  ngOnInit(): void {
    this.currencyResponse$ = this.currency.getCurrency();

    console.log(this.trips);
  }

  identifyCurrency(index: number, currency: CurrencyType): string {
    return currency.CurrencyData.code;
  }

  identifyTrips(index: number, trip: TripsModel): string {
    return trip.userEmail;
  }

  getMyTrips() {
    const email = this.user.email;

    const tripsData = this.userService.getUserTrips(email);

    console.log(tripsData);
  }
}
