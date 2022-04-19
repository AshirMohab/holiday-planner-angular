import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import TripsModel from 'src/app/models/tripsModel';
import { UserService } from 'src/app/services/user.service';
import { updateTrip } from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';

@Component({
  selector: 'app-edit-trips',
  templateUrl: './edit-trips.component.html',
  styleUrls: ['./edit-trips.component.scss'],
})
export class EditTripsComponent implements OnInit {
  editTripForm!: FormGroup;
  @Input() selectedTrip!: TripsModel;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private tripStore: Store<TripState>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.editTripForm = this.formBuilder.group({
      tripName: [''],
      description: [''],
      currency: [''],
      tripCost: 0,
      email: [''],
    });
  }

  submitTrip() {
    return (
      this.editTripForm.get('tripName')?.enabled &&
      this.editTripForm.get('description')?.enabled &&
      this.editTripForm.get('currency')?.enabled &&
      this.editTripForm.get('email')?.enabled
    );
  }

  updateTrip() {
    const newTrip: TripsModel = {
      tripID: this.selectedTrip?.tripID,
      name: this.editTripForm.value.tripName,
      description: this.editTripForm.value.description,
      currency: this.editTripForm.value.currency,
      userEmail: this.editTripForm.value.email,
      itinerary: this.selectedTrip.itinerary,
    };

    this.tripStore.dispatch(updateTrip({ trip: newTrip }));
  }
}
