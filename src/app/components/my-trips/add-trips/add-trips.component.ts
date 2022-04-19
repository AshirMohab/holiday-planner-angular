import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import TripsModel from 'src/app/models/tripsModel';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { addUserTrip } from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';
import { selectUserTrips } from 'src/app/store/trip/trip.selectors';

@Component({
  selector: 'app-add-trips',
  templateUrl: './add-trips.component.html',
  styleUrls: ['./add-trips.component.scss'],
})
export class AddTripsComponent implements OnInit {
  addTripForm!: FormGroup;
  addTripResponse$!: Observable<TripsModel>;

  user: User = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private userTrips: UserService,
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
