import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyData } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';
import User from 'src/app/models/user';
import { getCurrencyRates } from 'src/app/store/currency/currency.actions';
import { CurrencyState } from 'src/app/store/currency/currency.reducer';
import { addUserTrip } from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';
import * as CurrencySelectors from 'src/app/store/currency/currency.selectors';

@Component({
  selector: 'app-add-trips',
  templateUrl: './add-trips.component.html',
  styleUrls: ['./add-trips.component.scss'],
})
export class AddTripsComponent implements OnInit {
  addTripForm!: FormGroup;
  currencyResponse$!: Observable<CurrencyData | null>;

  addTripResponse$!: Observable<TripsModel>;
  @Input() currencyRates!: CurrencyData;
  isAdding: boolean = false;

  user: User = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private formBuilder: FormBuilder,
    private tripStore: Store<TripState>,
    private currencyStore: Store<CurrencyState>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.currencyStore.dispatch(getCurrencyRates());
    this.currencyResponse$ = this.currencyStore.pipe(
      select(CurrencySelectors.selectCurrrencyRates)
    );
  }

  initForm() {
    this.addTripForm = this.formBuilder.group({
      tripName: [''],
      description: [''],
      currency: [''],
    });
  }

  submitTrip() {
    return (
      this.addTripForm.get('tripName')?.enabled &&
      this.addTripForm.get('description')?.enabled &&
      this.addTripForm.get('currency')?.enabled
    );
  }

  addNewTrip() {
    const newTrip: TripsModel = {
      tripID: '',
      userID: '',
      name: this.addTripForm.value.tripName,
      description: this.addTripForm.value.description,
      currency: this.addTripForm.value.currency,
      userEmail: this.user.email,
      itinerary: [],
    };
    this.tripStore.dispatch(addUserTrip({ newTrip }));
    this.isAdding = true;
  }
}
