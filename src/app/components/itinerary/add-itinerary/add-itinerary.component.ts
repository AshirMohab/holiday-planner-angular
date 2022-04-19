import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import ItineraryItem from 'src/app/models/itineraryItem';
import TripsModel from 'src/app/models/tripsModel';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
import { updateTrip } from 'src/app/store/trip/trip.actions';
import { TripState } from 'src/app/store/trip/trip.reducer';

@Component({
  selector: 'app-add-itinerary',
  templateUrl: './add-itinerary.component.html',
  styleUrls: ['./add-itinerary.component.scss'],
})
export class AddItineraryComponent implements OnInit {
  addItineraryForm!: FormGroup;
  selectedTrip!: TripsModel | null;

  constructor(
    private tripService: TripService,
    private formBuilder: FormBuilder,
    private tripStore: Store<TripState>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addItineraryForm = this.formBuilder.group({
      name: [''],
      tag: [''],
      startDate: new Date(),
      endDate: new Date(),
      cost: 0,
    });
  }

  submitItinerary() {
    return (
      this.addItineraryForm.get('name')?.enabled &&
      this.addItineraryForm.get('tag')?.enabled &&
      this.addItineraryForm.get('startDate')?.enabled &&
      this.addItineraryForm.get('endDate')?.enable &&
      this.addItineraryForm.get('cost')?.enabled
    );
  }

  addItinerary() {
    const tripItinerary: ItineraryItem = {
      name: this.addItineraryForm.value.name,
      tag: this.addItineraryForm.value.tag,
      startDate: this.addItineraryForm.value.startDate,
      endDate: this.addItineraryForm.value.endDate,
      costEstimate: this.addItineraryForm.value.cost,
    };

    if (this.selectedTrip) {
      const newTrip: TripsModel = {
        ...this.selectedTrip,
        // tripID: this.selectedTrip?.tripID || '',
        // name: this.selectedTrip?.name || '',
        // description: this.selectedTrip?.description || '',
        // currency: this.selectedTrip?.currency || '',
        // userEmail: this.selectedTrip?.userEmail || '',
        itinerary: [{ ...tripItinerary }],
      };
      this.tripStore.dispatch(updateTrip({ trip: newTrip }));
    }
  }
}
