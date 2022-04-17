import { Component, Input, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import TripsModel from 'src/app/models/tripsModel';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
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
    console.log(this.user);
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
      name: this.addTripForm.value.tripName,
      description: this.addTripForm.value.description,
      currency: this.addTripForm.value.currency,
      userEmail: this.user.email,
      itinerary: [],
    };
    this.userTrips.addUserTrip(tripData);
    console.log('Trip has been added');
  }
}
