import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import TripsModel from 'src/app/models/tripsModel';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-trips',
  templateUrl: './add-trips.component.html',
  styleUrls: ['./add-trips.component.scss'],
})
export class AddTripsComponent implements OnInit {
  addTripForm!: FormGroup;

  user: User = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private userTrips: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addTripForm = this.formBuilder.group({
      tripName: [''],
      description: [''],
      currency: [''],
      tripCost: 0,
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
    const tripData: TripsModel = {
      tripID: '',
      name: this.addTripForm.value.tripName,
      description: this.addTripForm.value.description,
      currency: this.addTripForm.value.currency,
      userEmail: this.user.email,
      itinerary: [],
    };
    this.userTrips.addUserTrip(tripData);
  }
}
