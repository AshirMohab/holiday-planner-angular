import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyData } from 'src/app/models/currency';
import TripsModel from 'src/app/models/tripsModel';
import User from 'src/app/models/user';
import { addUserTrip } from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';

@Component({
  selector: 'app-add-trips',
  templateUrl: './add-trips.component.html',
  styleUrls: ['./add-trips.component.scss'],
})
export class AddTripsComponent implements OnInit {
  addTripForm!: FormGroup;
  addTripResponse$!: Observable<TripsModel>;
  @Input() currencyRates!: CurrencyData;

  user: User = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private formBuilder: FormBuilder,
    private tripStore: Store<TripState>
  ) {}

  ngOnInit(): void {
    this.initForm();
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
  }
}
