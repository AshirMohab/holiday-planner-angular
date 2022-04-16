import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyResponse, CurrencyType } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit {
  currencyResponse$!: Observable<CurrencyResponse>;

  constructor(private currency: CurrencyService) {}

  ngOnInit(): void {
    this.currencyResponse$ = this.currency.getCurrency();
    console.log('Currencies gotten:');
  }

  identifyCurrency(index: number, currency: CurrencyType): string {
    return currency.CurrencyData.code;
  }

  identifyTrips(index: number, trip: TripsModel): string {
    return trip.tripID;
  }
}
